import * as THREE from 'three';
import {SIZES} from "./constants/dimensions.ts";
import './style.css';
import Renderer from "./core/Renderer.ts";
import Scene from "./core/Scene.ts";

const canvas = document.querySelector('canvas.app') as HTMLCanvasElement;

const scene = Scene.getInstance();
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)


const camera = new THREE.PerspectiveCamera(75, SIZES.WIDTH/ SIZES.HEIGHT, 0.1, 1000)
camera.position.z = 5;
camera.position.x = -3;
scene.add(camera)

const rendererInstance = Renderer.getInstance(canvas);
const renderer= rendererInstance.getRenderer();
renderer.render(scene.getScene(), camera);
rendererInstance.setupResizeListener(camera,scene.getScene());



