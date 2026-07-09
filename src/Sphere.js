import * as THREE from 'three'

  export class SphereObject {
    constructor(scene) {
      const geometry = new THREE.SphereGeometry(1, 24, 30)
      const material = new THREE.MeshPhongMaterial({ color: 0x00ff00 })
      
      this.sphereMesh = new THREE.Mesh(geometry, material)

      const edgesGeometry = new THREE.EdgesGeometry(geometry, 1)
      const edgesMaterial = new THREE.LineBasicMaterial({ color: 0x000000 })
      const edges = new THREE.LineSegments(edgesGeometry, edgesMaterial)
      this.sphereMesh.add(edges)

      this.sphereMesh.position.y = 1
      scene.add(this.sphereMesh)
      
      this.ground = 1
      this.jumpHeight = 2.0;       // How high to jump in units
      this.jumpSpeed = 0.05;

      this.speed = 5
      this.keys = new Set()

      window.addEventListener('keydown', (event) => {
        this.keys.add(event.key)
      })

      window.addEventListener('keyup', (event) => {
        this.keys.delete(event.key)
      })
    }



    update(deltaTime) {
      const distance = this.speed * deltaTime

      if (this.keys.has('ArrowUp')) {
        this.sphereMesh.position.x -= distance
        this.sphereMesh.rotation.z += distance
      }

      if (this.keys.has('ArrowDown')) {
        this.sphereMesh.position.x += distance
        this.sphereMesh.rotation.z -= distance
      }

      if (this.keys.has('ArrowLeft')) {
        this.sphereMesh.position.z += distance
        this.sphereMesh.rotation.x += distance
      }

      if (this.keys.has('ArrowRight')) {
        this.sphereMesh.position.z -= distance
        this.sphereMesh.rotation.x -= distance
      }

      if(this.keys.has(' ')) {
        this.sphereMesh.position.y += distance + 3
      }

      if (this.sphereMesh.position.y > 1){
        this.sphereMesh.position.y -= distance + .6
      }
    }
  }
