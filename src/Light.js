import * as THREE from 'three'

export class LightObject {
  constructor(){

    // const color = 0xFFFFFF;
    // const intensity = 3;
    // this.light = new THREE.DirectionalLight( color, intensity );
    // this.light.position.set( 0, 10, 0 );
    // this.light.target.position.set( - 5, 0, 0 );

    // scene.add( ambient );

    this.light = new THREE.DirectionalLight( 0xffffff, 4 );

    this.light.position.set( 0, 12.5, 12.5 );
    this.light.castShadow = true;
    this.light.shadow.radius = 3;
    this.light.shadow.blurSamples = 8;
    this.light.shadow.mapSize.width = 1024;
    this.light.shadow.mapSize.height = 1024;

    const size = 10;
    this.light.shadow.camera.left = - size;
    this.light.shadow.camera.bottom = - size;
    this.light.shadow.camera.right = size;
    this.light.shadow.camera.top = size;
    this.light.shadow.camera.near = 1;
    this.light.shadow.camera.far = 50;

    
  }

  mesh() {
    return this.light
  }

  update(time){
    
  }
}