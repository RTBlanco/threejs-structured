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
}