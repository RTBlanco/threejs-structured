import * as THREE from 'three'
import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';

export class SphereObject {
  constructor() {
    const geometry = new THREE.SphereGeometry(1)
    
    const loader = new THREE.TextureLoader()
    const texture = loader.load("../public/textures/balldimpled.png")
    texture.colorSpace = THREE.SRGBColorSpace

    const material = new THREE.MeshPhongMaterial({  
      map: texture
    })

    this.sphereMesh = new THREE.Mesh(geometry, material)
    this.sphereMesh.position.y = 10
    this.sphereMesh.castShadow = true;

    
    // this.speed = 1
    // this.keys = {}

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

  }

  mesh() {
    return this.sphereMesh
  }


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
