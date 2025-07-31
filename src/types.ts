import * as THREE from "three";

export type Bubble = {
	mesh: THREE.Mesh;
	originalPosition: THREE.Vector3;
	floatSpeed: number;
	floatAmplitude: number;
	rotationSpeed: THREE.Vector3;
	phaseOffset: number;
};
