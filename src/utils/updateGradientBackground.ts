import { gradientsBackground } from "../constants/colors.ts";
import type Scene from "../core/Scene.ts";

let currentGradientIndex = 0;
let nextGradientIndex = 1;
let transitionProgress = 0;
let lastTransitionTime = 0;
const transitionDuration = 3000;

const interpolateColor = (color1: string, color2: string, factor: number) => {
	const hex1 = color1.replace("#", "");
	const hex2 = color2.replace("#", "");

	const r1 = parseInt(hex1.substr(0, 2), 16);
	const g1 = parseInt(hex1.substr(2, 2), 16);
	const b1 = parseInt(hex1.substr(4, 2), 16);

	const r2 = parseInt(hex2.substr(0, 2), 16);
	const g2 = parseInt(hex2.substr(2, 2), 16);
	const b2 = parseInt(hex2.substr(4, 2), 16);

	const r = Math.round(r1 + factor * (r2 - r1));
	const g = Math.round(g1 + factor * (g2 - g1));
	const b = Math.round(b1 + factor * (b2 - b1));

	return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
};

export const updateGradientBackground = (currentTime: number, scene: Scene) => {
	if (currentTime - lastTransitionTime >= transitionDuration) {
		currentGradientIndex = nextGradientIndex;
		nextGradientIndex = (nextGradientIndex + 1) % gradientsBackground.length;
		lastTransitionTime = currentTime;
		transitionProgress = 0;
	} else {
		transitionProgress =
			(currentTime - lastTransitionTime) / transitionDuration;
	}

	const easedProgress =
		transitionProgress < 0.5
			? 2 * transitionProgress * transitionProgress
			: 1 - Math.pow(-2 * transitionProgress + 2, 2) / 2;

	const currentGradient = gradientsBackground[currentGradientIndex];
	const nextGradient = gradientsBackground[nextGradientIndex];

	const topColor = interpolateColor(
		currentGradient.top,
		nextGradient.top,
		easedProgress,
	);
	const bottomColor = interpolateColor(
		currentGradient.bottom,
		nextGradient.bottom,
		easedProgress,
	);

	scene.setGradientBackground(topColor, bottomColor);
};
