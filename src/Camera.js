import * as THREE from 'three'

export class CameraObject{
  constructor(){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(50, 30, 0);
    return this.camera
  }

  mesh() {
    return this.camera
  }

  update(time){

  }

  _lockOn(object) {
    this.camera.lookAt(object.position)
  }
}