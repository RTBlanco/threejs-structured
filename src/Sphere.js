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

      this.speed = 5
      this.keys = {}

      window.addEventListener('keydown', e => {
        this.keys[e.code] = true
      })

      window.addEventListener('keyup', e => {
        this.keys[e.code] = false
      })

    }



    update(deltaTime) {
      const distance = this.speed * deltaTime


      if (this.keys["ArrowUp"]) {
        this.sphereMesh.position.x -= distance
        this.sphereMesh.rotation.z += distance
      }

      if (this.keys['ArrowDown']) {
        this.sphereMesh.position.x += distance
        this.sphereMesh.rotation.z -= distance
      }

      if (this.keys['ArrowLeft']) {
        this.sphereMesh.position.z += distance
        this.sphereMesh.rotation.x += distance
      }

      if (this.keys['ArrowRight']) {
        this.sphereMesh.position.z -= distance
        this.sphereMesh.rotation.x -= distance
      }

      if(this.keys['Space']) {
        this.sphereMesh.position.y += distance + 1
      }

      if (this.sphereMesh.position.y > 1){
        this.sphereMesh.position.y -= distance + .2 
      }
    }
  }
