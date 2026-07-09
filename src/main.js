import './style.css'
import { Manager } from './Manager'
import * as THREE from 'three'


const canvas = document.querySelector('#c')
const manager = new Manager(canvas)
const renderer = manager.renderer

const clock = new THREE.Timer()
clock.connect(document)
function render() {
  clock.update()
  manager.update(clock.getDelta());
}
manager.renderer.setAnimationLoop(render)
