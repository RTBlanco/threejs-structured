import './style.css'
import { Manager } from './Manager'
import * as THREE from 'three'







const canvas = document.querySelector('#c')
const manager = new Manager(canvas)

const renderer = manager.renderer


function render() {
  manager.update();
}
manager.renderer.setAnimationLoop(render)

// function resizeRendererToDisplaySize(renderer, maxPixelCount=3840*2160) {

//   const pixelRatio = window.devicePixelRatio;
//   let width  = Math.floor( canvas.clientWidth  * pixelRatio );
//   let height = Math.floor( canvas.clientHeight * pixelRatio );
//   const pixelCount = width * height;
//   const renderScale = pixelCount > maxPixelCount ? Math.sqrt(maxPixelCount / pixelCount) : 1;
//   width = Math.floor(width * renderScale);
//   height = Math.floor(height * renderScale);

//   const needResize = canvas.width !== width || canvas.height !== height;
//   if (needResize) {
//     renderer.setSize(width, height, false)
//   }

//   return needResize
// }


// function animate( time ) {
//   time *= 0.001; //convert time to seconds

//   if (resizeRendererToDisplaySize(renderer)) {
//     camera.aspect = canvas.clientWidth / canvas.clientHeight
//     camera.updateProjectionMatrix()
//   }


//   renderer.render(scene, camera);
// }
// renderer.setAnimationLoop( animate );

