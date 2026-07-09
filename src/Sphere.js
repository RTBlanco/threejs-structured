import * as THREE from 'three'
import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';

export class SphereObject {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 24, 30)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    
    this.sphereMesh = new THREE.Mesh(geometry, material)
    this.sphereMesh.position.y = 10

    // this.speed = 1
    // this.keys = {}


    // window.addEventListener('keydown', e => {
    //   this.keys[e.code] = true
    // })

    // window.addEventListener('keyup', e => {
    //   this.keys[e.code] = false
    // })

    // Movement input
    this.movement = { forward: 0, right: 0 };

    window.addEventListener( 'keydown', ( event ) => {

      if ( event.key === 'w' || event.key === 'ArrowUp' ) this.movement.forward = 1;
      if ( event.key === 's' || event.key === 'ArrowDown' ) this.movement.forward = - 1;
      if ( event.key === 'a' || event.key === 'ArrowLeft' ) this.movement.right = - 1;
      if ( event.key === 'd' || event.key === 'ArrowRight' ) this.movement.right = 1;
  
    } );

    window.addEventListener( 'keyup', ( event ) => {
  
      if ( event.key === 'w' || event.key === 's' || event.key === 'ArrowUp' || event.key === 'ArrowDown' ) this.movement.forward = 0;
      if ( event.key === 'a' || event.key === 'd' || event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) this.movement.right = 0;
  
    } );


    // this.characterController = physics.world.createCharacterController( 0.01 );
    // this.characterController.setApplyImpulsesToDynamicBodies( true );
    // this.characterController.setCharacterMass( 3 );
    // const colliderDesc = physics.RAPIER.ColliderDesc.capsule( 0.5, 0.3 ).setTranslation( 0, 0.8, 0 );
    // this.sphereMesh.userData.collider = physics.world.createCollider( colliderDesc );

  }

  mesh() {
    return this.sphereMesh
  }

  // update(deltaTime) {
  //   const acceleration = this.speed * deltaTime

  //   if (this.keys["ArrowUp"]) {
  //     this.velocity.x -= acceleration
  //   }

  //   if (this.keys["ArrowDown"]) {
  //     this.velocity.x += acceleration
  //   }

  //   if (this.keys["ArrowLeft"]) {
  //     this.velocity.z += acceleration
  //   }

  //   if (this.keys["ArrowRight"]) {
  //     this.velocity.z -= acceleration
  //   }

  //   // apply movement from velocity
  //   this.sphereMesh.position.x += this.velocity.x
  //   this.sphereMesh.position.z += this.velocity.z

  //   // friction / damping
  //   this.velocity.x *= this.friction
  //   this.velocity.z *= this.friction

  //   if (this.keys["Space"]) {
  //     this.sphereMesh.position.y += acceleration + 1
  //   }

  // }

  update(deltaTime) {
    // const deltaTime = 1 / 60;

    // Character movement
    // const speed = 2.5 * deltaTime;
    // const moveVector = new physics.RAPIER.Vector3( movement.right * speed, 0, - movement.forward * speed );

    // characterController.computeColliderMovement( player.userData.collider, moveVector );

    // // Read the result.
    // const translation = characterController.computedMovement();
    // const position = player.userData.collider.translation();

    // position.x += translation.x;
    // position.y += translation.y;
    // position.z += translation.z;

    // player.userData.collider.setTranslation( position );

    // // Sync Three.js mesh with Rapier collider
    // player.position.set( position.x, position.y, position.z );
  }
}