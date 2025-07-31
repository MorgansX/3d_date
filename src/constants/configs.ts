import * as THREE from "three";

export const SOAP_BUBBLE_MATERIAL_CONFIG = {
	transparent: true,
	opacity: 0.3,
	transmission: 1,
	thickness: 0.3,
	roughness: 0,
	metalness: 0,
	iridescence: 1,
	iridescenceIOR: 1,
	iridescenceThicknessRange: [100, 900],
	ior: 1.4,
	reflectivity: 0.1,
	side: THREE.DoubleSide,
	color: new THREE.Color(0xffffff),
};

export const TEXT_GEOMETRY_CONFIG = {
	size: 0.5,
	depth: 0.4,
	curveSegments: 12,
	bevelEnabled: true,
	bevelThickness: 0.03,
	bevelSize: 0.02,
	bevelOffset: 0,
	bevelSegments: 5,
};
