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
        while(this.scene.children.length > 0) {
            this.scene.remove(this.scene.children[0]);
        }
    }

    public setBackground(color: THREE.ColorRepresentation): void {
        this.scene.background = new THREE.Color(color);
    }

    public setFog(color: THREE.ColorRepresentation, near: number, far: number): void {
        this.scene.fog = new THREE.Fog(color, near, far);
    }

    public addLight(light: THREE.Light): void {
        this.scene.add(light);
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
