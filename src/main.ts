import * as THREE from 'three';
import { SIZES } from "./constants/dimensions.ts";
import Renderer from "./core/Renderer.ts";
import Scene from "./core/Scene.ts";
import moment from "moment";

import { FontLoader, Font } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

import './style.css';

const canvas = document.querySelector('canvas.app') as HTMLCanvasElement;
const rendererInstance = Renderer.getInstance(canvas);
const renderer = rendererInstance.getRenderer();
const fontLoader = new FontLoader();

const mouse = {
    x: 0,
    y: 0
};

const scene = Scene.getInstance();

let textMesh: THREE.Mesh | null = null;

const date = moment().format('D MMMM');

// Added proper type annotation for font parameter
fontLoader.load('/fonts/rubic_black.json', (font: Font) => {
    const textGeometry = new TextGeometry(
        date,
        {
            font: font,
            size: 0.5,
            depth: 0.2,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 0.03,
            bevelSize: 0.02,
            bevelOffset: 0,
            bevelSegments: 5
        }
    )

    textGeometry.center();
    const textMaterial = new THREE.MeshMatcapMaterial()

    textMesh = new THREE.Mesh(textGeometry, textMaterial)
    scene.add(textMesh)

    renderer.render(scene.getScene(), camera);
})

const camera = new THREE.PerspectiveCamera(75, SIZES.WIDTH / SIZES.HEIGHT, 0.1, 1000)
camera.position.z = 5;
scene.add(camera)

window.addEventListener('mousemove', (event) => {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
});

const animate = () => {
    requestAnimationFrame(animate);

    if (textMesh) {
        const maxRotationX = Math.PI * 0.1;
        const maxRotationY = Math.PI * 0.1;

        const targetRotationX = mouse.y * maxRotationX;
        const targetRotationY = -mouse.x * maxRotationY;

        const lerpFactor = 0.05;
        textMesh.rotation.x += (targetRotationX - textMesh.rotation.x) * lerpFactor;
        textMesh.rotation.y += (targetRotationY - textMesh.rotation.y) * lerpFactor;
    }

    renderer.render(scene.getScene(), camera);
}

animate();

rendererInstance.setupResizeListener(camera, scene.getScene());
