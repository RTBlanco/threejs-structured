import * as THREE from 'three'

export class CameraObject{
  constructor(scene=null){
    const fov = 40;
    const aspect = 2;  // the canvas default
    const near = 0.1;
    const far = 1000;
    const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
    camera.position.set(50, 30, 0);

    if (scene) {
      scene.add(camera)
    }

    return camera
  }
}