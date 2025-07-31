import * as THREE from "three";

class Scene {
	private static instance: Scene | null = null;
	private scene: THREE.Scene;

	private constructor() {
		this.scene = new THREE.Scene();
	}

	public add(object: THREE.Object3D): void {
		this.scene.add(object);
	}

	public remove(object: THREE.Object3D): void {
		this.scene.remove(object);
	}

	public getScene(): THREE.Scene {
		return this.scene;
	}

	public clear(): void {
		while (this.scene.children.length > 0) {
			this.scene.remove(this.scene.children[0]);
		}
	}

	public setGradientBackground(
		topColor: string,
		bottomColor: string,
		middleColor?: string,
	): void {
		const canvas = document.createElement("canvas");
		canvas.width = 2;
		canvas.height = 256;

		const context = canvas.getContext("2d")!;
		const gradient = context.createLinearGradient(0, 0, 0, 256);

		if (middleColor) {
			gradient.addColorStop(0, topColor);
			gradient.addColorStop(0.5, middleColor);
			gradient.addColorStop(1, bottomColor);
		} else {
			gradient.addColorStop(0, topColor);
			gradient.addColorStop(1, bottomColor);
		}

		context.fillStyle = gradient;
		context.fillRect(0, 0, 2, 256);

		const texture = new THREE.CanvasTexture(canvas);
		texture.magFilter = THREE.LinearFilter;
		texture.minFilter = THREE.LinearFilter;

		this.scene.background = texture;
	}

	public static getInstance(): Scene {
		if (!Scene.instance) {
			Scene.instance = new Scene();
		}
		return Scene.instance;
	}
	public static destroy(): void {
		if (Scene.instance) {
			Scene.instance.clear();
			Scene.instance = null;
		}
	}
}

export default Scene;
