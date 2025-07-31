import * as THREE from "three";
import { SOAP_BUBBLE_MATERIAL_CONFIG } from "../constants/configs.ts";
import type { Bubble } from "../types.ts";
import Scene from "./Scene.ts";

const soapBubbleMaterial = new THREE.MeshPhysicalMaterial(
	//@ts-expect-error pure types support
	SOAP_BUBBLE_MATERIAL_CONFIG,
);

const bubblesCount = 100;
export const bubbles: Array<Bubble> = [];

export const renderBubbles = (scene: Scene) => {
	for (let i = 0; i < bubblesCount; i++) {
		const size = 0.2 + Math.random() * 0.4;
		const soapBubbleGeometry = new THREE.SphereGeometry(size, 32, 32);
		const soapBubble = new THREE.Mesh(soapBubbleGeometry, soapBubbleMaterial);
		scene.add(soapBubble);

		const x = (Math.random() - 0.5) * 10;
		const y = (Math.random() - 0.5) * 10;
		const z = (Math.random() - 0.5) * 10;

		soapBubble.position.set(x, y, z);

		bubbles.push({
			mesh: soapBubble,
			originalPosition: new THREE.Vector3(x, y, z),
			floatSpeed: 0.1 + Math.random() * 0.5,
			floatAmplitude: 0.3 + Math.random() * 0.7,
			rotationSpeed: new THREE.Vector3(
				(Math.random() - 0.5) * 0.02,
				(Math.random() - 0.5) * 0.02,
				(Math.random() - 0.5) * 0.02,
			),
			phaseOffset: Math.random() * Math.PI * 2,
		});
	}
};
