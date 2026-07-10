import * as THREE from 'three'

export class PlaneObject{
  constructor() {
    // const planeSize = 40;

    // // texture for plane
    // const loader = new THREE.TextureLoader()
    // const texture = loader.load('https://threejs.org/manual/examples/resources/images/checker.png')
    // texture.wrapS = THREE.RepeatWrapping
    // texture.wrapT = THREE.RepeatWrapping
    // texture.magFilter = THREE.NearestFilter
    // texture.colorSpace = THREE.SRGBColorSpace
    // const repeats = planeSize / 2
    // texture.repeat.set(repeats, repeats)

    // // plane
    // const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
    // const planeMat = new THREE.MeshPhongMaterial({
    //   map: texture,
    //   side: THREE.DoubleSide
    // })
    // this.planeMesh = new THREE.Mesh(planeGeo, planeMat)
    // this.planeMesh.rotation.x = Math.PI * .5
    // this.planeMesh.userData.physics = { mass: 0 }
    // // scene.add(mesh)

    // scene.add(mesh)

    const geometry = new THREE.BoxGeometry( 20, 0.5, 20 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );

    this.floor = new THREE.Mesh( geometry, material );
    this.floor.receiveShadow = true;

    this.floor.position.y = - 0.25;
    this.floor.userData.physics = { mass: 0 };

    new THREE.TextureLoader().load('https://threejs.org/manual/examples/resources/images/checker.png', ( texture ) => {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 20, 20 );
      this.floor.material.map = texture;
      this.floor.material.needsUpdate = true;

    } );

  }

  mesh() {
    return this.floor
  }

  update(time){
    
  }
}