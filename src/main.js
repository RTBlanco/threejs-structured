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
