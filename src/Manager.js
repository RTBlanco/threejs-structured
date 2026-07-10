import * as THREE from 'three'
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import { CameraObject } from './Camera';
import { PlaneObject } from './Plane';
import { LightObject } from './Light';
import { SphereObject } from './Sphere';

import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';

export class Manager {
  constructor(canvas, scenes=[], cameras=[]) {
    this.canvas = canvas
    this.renderer = new THREE.WebGLRenderer({antialias: true, canvas: this.canvas})
    this.scenes = scenes
    this.activeScene = scenes.length > 0 ? scenes[0] : new THREE.Scene()
    this.cameras = cameras
    this.activeCamera = cameras.length > 0 ? cameras[0]: new CameraObject()
    const ambient = new THREE.HemisphereLight( 0x555555, 0xFFFFFF );
    this.activeScene.add(ambient)

    this.floor = new PlaneObject()
    this.activeScene.add(this.floor.mesh())
    this.activeScene.add(new LightObject().mesh()) 

    this.objects = [
      new SphereObject(),
    ]
    
    this.initPhysics();
    
    const controls = new OrbitControls(this.activeCamera, this.canvas)
    controls.target.set(0,5,0)
    controls.update()

    
  }


  update(time) {
    if (this._resizeRendererToDisplaySize(this.renderer)) {
      this.activeCamera.aspect = this.canvas.clientWidth / this.canvas.clientHeight
      this.activeCamera.updateProjectionMatrix()
    }

    if ( this.physicsHelper ) this.physicsHelper.update();
  
    
    for(let i=0; i < this.objects.length; i++){
      this.objects[i].update(time);
    }



    this.renderer.render(this.activeScene, this.activeCamera);
  }



  async initPhysics() {
    
    //Initialize physics engine using the script in the jsm/physics folder
    this.physics = await RapierPhysics();
    
    
    //Optionally display collider outlines
    this.physicsHelper = new RapierHelper( this.physics.world );
    this.activeScene.add( this.physicsHelper );
    this.physics.addScene( this.activeScene );
    
    this._addToScene(this.objects)   
  }

  _addToScene(items){
    for (const item of items) {
      const mesh = item.mesh();

      this.activeScene.add(mesh);
      this.physics.addMesh(mesh, 1, 1);

      const body = mesh.userData.physics?.body;

      body?.setLinearDamping(1.5);
      body?.setAngularDamping(1.5);
      body?.setGravityScale(10, true);
    }
  }

  _resizeRendererToDisplaySize(renderer, maxPixelCount=3840*2160) {

    const pixelRatio = window.devicePixelRatio;
    let width  = Math.floor( this.canvas.clientWidth  * pixelRatio );
    let height = Math.floor( this.canvas.clientHeight * pixelRatio );
    const pixelCount = width * height;
    const renderScale = pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;
    width = Math.floor(width * renderScale);
    height = Math.floor(height * renderScale);

    const needResize = this.canvas.width !== width || this.canvas.height !== height;
    if (needResize) {
      renderer.setSize(width, height, false)
    }

    return needResize
  }

}
