import * as THREE from 'three'
import { RapierPhysics } from 'three/addons/physics/RapierPhysics.js';
import { RapierHelper } from 'three/addons/helpers/RapierHelper.js';

export class SphereObject {
  constructor() {
    const geometry = new THREE.SphereGeometry(1, 24, 30)
    const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
    
    this.sphereMesh = new THREE.Mesh(geometry, material)

    const edgesGeometry = new THREE.EdgesGeometry(geometry, 1)
    const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
    const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)

    this.sphereMesh.add(edges)

    this.sphereMesh.position.y = 10

    this.speed = 1
    this.keys = {}

    this.velocity = new THREE.Vector3(0, 0, 0)
    this.friction = .97

    window.addEventListener('keydown', e => {
      this.keys[e.code] = true
    })

    window.addEventListener('keyup', e => {
      this.keys[e.code] = false
    })


  }

  mesh() {
    return this.sphereMesh
  }

  update(deltaTime) {
    const acceleration = this.speed * deltaTime

    if (this.keys["ArrowUp"]) {
      this.velocity.x -= acceleration
    }

    if (this.keys["ArrowDown"]) {
      this.velocity.x += acceleration
    }

    if (this.keys["ArrowLeft"]) {
      this.velocity.z += acceleration
    }

    if (this.keys["ArrowRight"]) {
      this.velocity.z -= acceleration
    }

    // apply movement from velocity
    this.sphereMesh.position.x += this.velocity.x
    this.sphereMesh.position.z += this.velocity.z

    // friction / damping
    this.velocity.x *= this.friction
    this.velocity.z *= this.friction

    if (this.keys["Space"]) {
      this.sphereMesh.position.y += acceleration + 1
    }

  }
}