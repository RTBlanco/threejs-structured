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
      debugger
      this.objects[i].update(time);
      if ( this.physics && this.characterController ) {
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

  _controls(player) {
    // Rapier Character Controller
    this.characterController = this.physics.world.createCharacterController( 0.01 );
    this.characterController.setApplyImpulsesToDynamicBodies( true );
    this.characterController.setCharacterMass( 3 );
    const colliderDesc = this.physics.RAPIER.ColliderDesc.ball(1, 24, 30).setTranslation( 0, 0.8, 0 );
    player.userData.collider = this.physics.world.createCollider( colliderDesc );
  }

  _movement(deltaTime, player) {

    // Character movement
    const speed = 5 * deltaTime;
    const moveVector = new this.physics.RAPIER.Vector3( player.movement.right * speed, 0, - player.movement.forward * speed );

    this.characterController.computeColliderMovement( player.mesh().userData.collider, moveVector );

    // Read the result.
    const translation = this.characterController.computedMovement();
    const position = player.mesh().userData.collider.translation();

    position.x += translation.x;
    position.y += translation.y;
    position.z += translation.z;

    player.mesh().userData.collider.setTranslation( position );

    // Sync Three.js mesh with Rapier collider
    player.mesh().position.set( position.x, position.y, position.z );
  }

  _addToScene(items){
    for(let i = 0; i < items.length; i ++){
      this._controls(items[i].mesh())
      // this.activeScene.add(items[i].mesh())
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