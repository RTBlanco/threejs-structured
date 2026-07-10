import * as THREE from 'three'
import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';

export class SphereObject {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 24, 30)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    
    this.sphereMesh = new THREE.Mesh(geometry, material)
    this.sphereMesh.position.y = 10
    this.sphereMesh.castShadow = true;
    // this.speed = 1
    // this.keys = {}


    // window.addEventListener('keydown', e => {
    //   this.keys[e.code] = true
    // })

    // window.addEventListener('keyup', e => {
    //   this.keys[e.code] = false
    // })

    // Movement input
    this.onGround = false
    this.jumpQueued = false
    this.movement = { forward: 0, right: 0 };

    window.addEventListener( 'keydown', ( event ) => {

      if ( event.key === 'w' || event.key === 'ArrowUp' ) this.movement.forward = 1;
      if ( event.key === 's' || event.key === 'ArrowDown' ) this.movement.forward = - 1;
      if ( event.key === 'a' || event.key === 'ArrowLeft' ) this.movement.right = - 1;
      if ( event.key === 'd' || event.key === 'ArrowRight' ) this.movement.right = 1;
      if ( event.key === ' ' && ! event.repeat ) {
        event.preventDefault();
        this.jumpQueued = true
      }
  
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
    const mesh = this.sphereMesh;
    const body = mesh.userData.physics?.body;
    if (!body) return;

    const speed = 6;
    const direction = new THREE.Vector3(this.movement.right, 0, -this.movement.forward);
    if (direction.lengthSq() > 1) direction.normalize();

    const velocity = body.linvel();
    const position = body.translation();
    const isGrounded = position.y <= 1.5;

    const hasMovementInput = direction.lengthSq() > 0;

    body.setLinvel({
      // Keep the existing velocity after releasing the keys.
      x: hasMovementInput ? direction.x * speed : velocity.x,
      y: this.jumpQueued && isGrounded ? 25 : velocity.y,
      z: hasMovementInput ? direction.z * speed : velocity.z,
    }, true);

    this.onGround = isGrounded;
    this.jumpQueued = false;
  }
}
