import type { Bubble } from "../types.ts";
import moment from "moment/moment";

export const animateBubbles = (bubbles: Array<Bubble>) => {
	const time = moment().valueOf() * 0.001;
	bubbles.forEach((bubble) => {
		const floatingY =
			Math.sin(time * bubble.floatSpeed + bubble.phaseOffset) *
			bubble.floatAmplitude;

		const floatingX =
			Math.sin(time * bubble.floatSpeed * 0.7 + bubble.phaseOffset) *
			(bubble.floatAmplitude * 0.3);
		const floatingZ =
			Math.cos(time * bubble.floatSpeed * 0.5 + bubble.phaseOffset) *
			(bubble.floatAmplitude * 0.2);

		bubble.mesh.position.set(
			bubble.originalPosition.x + floatingX,
			bubble.originalPosition.y + floatingY,
			bubble.originalPosition.z + floatingZ,
		);

		bubble.mesh.rotation.x += bubble.rotationSpeed.x;
		bubble.mesh.rotation.y += bubble.rotationSpeed.y;
		bubble.mesh.rotation.z += bubble.rotationSpeed.z;
	});
};
