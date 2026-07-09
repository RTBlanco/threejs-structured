import * as THREE from 'three'

export class LightObject {
  constructor(scene){

    const color = 0xFFFFFF;
    const intensity = 3;
    const light = new THREE.DirectionalLight( color, intensity );
    light.position.set( 0, 10, 0 );
    light.target.position.set( - 5, 0, 0 );
  
    scene.add(light)
  }

  update(time){
    
  }
}