import * as THREE from "three";
import { SIZES } from "./constants/dimensions.ts";
import Renderer from "./core/Renderer.ts";
import Scene from "./core/Scene.ts";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { updateGradientBackground } from "./utils/updateGradientBackground.ts";
import { animateBubbles } from "./utils/animateBubbles.ts";
import { bubbles, renderBubbles } from "./core/renderBubbles.ts";
import { renderText } from "./core/renderText.ts";
import createControls from "./core/orbitControlls.ts";

import "./style.css";

const canvas = document.querySelector("canvas.app") as HTMLCanvasElement;

const rendererInstance = Renderer.getInstance(canvas);
const renderer = rendererInstance.getRenderer();

const fontLoader = new FontLoader();

const scene = Scene.getInstance();

const camera = new THREE.PerspectiveCamera(
	75,
	SIZES.WIDTH / SIZES.HEIGHT,
	0.1,
	1000,
);
camera.position.z = 5.5;
scene.add(camera);

renderText(fontLoader, renderer, scene, camera);
renderBubbles(scene);

const controls = createControls(camera, canvas);

const animate = () => {
	requestAnimationFrame(animate);
	animateBubbles(bubbles);
	controls.update();
	updateGradientBackground(Date.now(), scene);
	renderer.render(scene.getScene(), camera);
};

animate();

rendererInstance.setupResizeListener(camera, scene.getScene());
