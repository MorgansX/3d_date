//@ts-expect-error pure types support
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { PerspectiveCamera } from "three";

const createControls = (
	camera: PerspectiveCamera,
	canvas: HTMLCanvasElement,
): OrbitControls => {
	const controls = new OrbitControls(camera, canvas);

	controls.enableDamping = true;
	controls.dampingFactor = 0.05;
	controls.enableZoom = true;
	controls.enableRotate = true;
	controls.enablePan = true;

	return controls;
};

export default createControls;
