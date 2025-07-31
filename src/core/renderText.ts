import { TEXT_GEOMETRY_CONFIG } from "../constants/configs.ts";
import * as THREE from "three";
//@ts-expect-error pure types support
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
//@ts-expect-error pure types support
import type { TextGeometryParameters } from "three/examples/jsm/geometries/TextGeometry";
import type { Font } from "three/addons/loaders/FontLoader.js";
import moment from "moment/moment";
import {Camera, Loader, TextureLoader} from "three";
import { getCurrentCity } from "../utils/getCurrentCity.ts";
import { getTemperatureByCity } from "../utils/getTemperatureByCity.ts";
import type Scene from "./Scene.ts";

let textMesh: THREE.Mesh | null = null;
const textureLoader = new TextureLoader();
const matcapTexture = textureLoader.load("/textures/matcaps/1.png");

export const renderText = (fontLoader:Loader, renderer:THREE.WebGLRenderer, scene:Scene, camera:Camera) => {
	const date = moment().format("D MMMM");
	//@ts-expect-error pure types support
	fontLoader.load("/fonts/rubic_black.json", async (font: Font) => {
        const currentCity = await getCurrentCity();
        const temperature = await getTemperatureByCity(currentCity as string);

		const textGeometry = new TextGeometry(
			`Today is \n${date} \n${currentCity} ${temperature} °C`,
			{
				font,
				...TEXT_GEOMETRY_CONFIG,
			} as TextGeometryParameters,
		);

		const textMaterial = new THREE.MeshMatcapMaterial({
			matcap: matcapTexture,
		});

		textGeometry.center();
		textMesh = new THREE.Mesh(textGeometry, textMaterial);
		scene.add(textMesh);

		renderer.render(scene.getScene(), camera);
	});
};
