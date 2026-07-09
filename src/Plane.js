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
    // const mesh = new THREE.Mesh(planeGeo, planeMat)
    // mesh.rotation.x = Math.PI * .5
    // // scene.add(mesh)

    // scene.add(mesh)

    const geometry = new THREE.BoxGeometry( 10, 0.5, 10 );
    const material = new THREE.MeshStandardMaterial( { color: 0xFFFFFF } );

    const floor = new THREE.Mesh( geometry, material );
    floor.receiveShadow = true;

    floor.position.y = - 0.25;
    floor.userData.physics = { mass: 0 };

    new THREE.TextureLoader().load( 'textures/grid.png', function ( texture ) {

      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      texture.repeat.set( 20, 20 );
      floor.material.map = texture;
      floor.material.needsUpdate = true;

    } );
  }

  update(time){
    
  }
}