import * as THREE from 'three'

export class PlaneObject{
  constructor(scene) {
    const planeSize = 40;

    // texture for plane
    const loader = new THREE.TextureLoader()
    const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png')
    texture.wrapS = THREE.RepeatWrapping
    texture.wrapT = THREE.RepeatWrapping
    texture.magFilter = THREE.NearestFilter
    texture.colorSpace = THREE.SRGBColorSpace
    const repeats = planeSize / 2
    texture.repeat.set(repeats, repeats)

    // plane
    const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    const planeMat = new THREE.MeshPhongMaterial({
      map: texture,
      side: THREE.DoubleSide
    })
    const mesh = new THREE.Mesh(planeGeo, planeMat)
    mesh.rotation.x = Math.PI * .5
    // scene.add(mesh)

    scene.add(mesh)
  }

  update(time){
    
  }
}