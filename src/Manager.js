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

    this.activeScene.add(new PlaneObject().mesh())
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
      if ( this.physics ) {
        this._movement(time, this.objects[i])
      }
    }



    this.renderer.render(this.activeScene, this.activeCamera);
  }



  async initPhysics() {
    
    //Initialize physics engine using the script in the jsm/physics folder
    this.physics = await RapierPhysics();
    
    // addBody( );
    
    //Optionally display collider outlines
    this.physicsHelper = new RapierHelper( this.physics.world );
    this.activeScene.add( this.physicsHelper );
    this.physics.addScene( this.activeScene );
    
    this._addToScene(this.objects)

  }

  _movement(deltaTime, player) {
    const mesh = player.mesh();
    const body = mesh.userData.physics?.body;
    if ( ! body ) return;

    const speed = 6;
    const direction = new THREE.Vector3( player.movement.right, player.movement.jump, - player.movement.forward );
    if ( direction.lengthSq() > 1 ) direction.normalize();

    const velocity = body.linvel();
    body.setLinvel( {
      x: direction.x * speed,
      // y: velocity.y,
      y: direction.y * speed + velocity.y,
      z: direction.z * speed,
    }, true );
  }

  _addToScene(items){
    for(let i = 0; i < items.length; i ++){
      this.activeScene.add(items[i].mesh())
      this.physics.addMesh(items[i].mesh(), 1, 0.5 )
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
