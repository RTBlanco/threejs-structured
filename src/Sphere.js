import * as THREE from 'three'

export class SphereObject {
  constructor(scene) {
    const radius = 1
    const segments = 24
    const geometry = new THREE.SphereGeometry(radius, segments)

    const material = new THREE.MeshPhongMaterial({color: 0x00ff00});
    this.sphereMesh = new THREE.Mesh(geometry, material);
    this.sphereMesh.position.y = 1

    scene.add(this.sphereMesh)
  }

  _moveUp() {
    console.log('up')
    this.sphereMesh.position.x -= .001
  }

  _moveDown() {
    console.log('down')
    this.sphereMesh.position.x += .001
  }

  _moveLeft(){
    console.log('left')
    this.sphereMesh.position.z += .001
  }
  
  _moveRight(){
    console.log('right')
    this.sphereMesh.position.z -= .001
  }

  _move() {
    addEventListener('keydown', (e) => {

      switch (e.key) {
        case 'ArrowUp':
          this._moveUp() 
          break;
        case 'ArrowDown':
          this._moveDown() 
          break;

        case 'ArrowLeft':
          this._moveLeft()
          break;

        case 'ArrowRight':
          this._moveRight() 
          break;

        default:
          break;
      }
    })
  }
  update(time){
    this._move()
  }
}