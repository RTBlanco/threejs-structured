import * as THREE from 'three'

export class BlockObject{
  constructor(){
    const blockSize = 2.5
    const geometry = new THREE.BoxGeometry(blockSize, blockSize, blockSize, blockSize)
    const material = new THREE.MeshPhongMaterial({
      color: "green"
    })

    this.blockMesh = new THREE.Mesh(geometry, material)
  }

  mesh() {
    return this.blockMesh
  }


  update(deltaTime) {

  }
}