import * as THREE from 'three';
import { SIZES } from "../constants/dimensions.ts";
class Renderer {
    private static instance: Renderer | null = null;
    private renderer: THREE.WebGLRenderer;

    private constructor(canvas: HTMLCanvasElement) {
        this.renderer = new THREE.WebGLRenderer({ canvas });
        this.renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
    }

    public static getInstance(canvas?: HTMLCanvasElement): Renderer {
        if (!Renderer.instance) {
            if (!canvas) {
                throw new Error('Canvas is required for first initialization');
            }
            Renderer.instance = new Renderer(canvas);
        }
        return Renderer.instance;
    }

    public getRenderer(): THREE.WebGLRenderer {
        return this.renderer;
    }

    public handleResize(camera: THREE.PerspectiveCamera, scene: THREE.Scene): void {
        SIZES.WIDTH = window.innerWidth;
        SIZES.HEIGHT = window.innerHeight;

        camera.aspect = SIZES.WIDTH / SIZES.HEIGHT;
        camera.updateProjectionMatrix();

        this.renderer.setSize(SIZES.WIDTH, SIZES.HEIGHT);
        this.renderer.render(scene, camera);
    }

    public setupResizeListener(camera: THREE.PerspectiveCamera, scene: THREE.Scene): void {
        const handleResizeEvent = () => this.handleResize(camera, scene);
        window.addEventListener('resize', handleResizeEvent);
    }
}

export default Renderer;
