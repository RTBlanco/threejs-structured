import * as THREE from 'three'

export class CameraObject{
  constructor(scene=null){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    this.camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    this.camera.position.set(50, 30, 0);

    if (scene) {
      scene.add(this.camera)
    }

    return this.camera
  }

  update(time){
    
  }

  _lockOn(object) {
    this.camera.lookAt(object.position)
  }
}