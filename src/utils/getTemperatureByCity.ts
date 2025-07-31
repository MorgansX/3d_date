export const getTemperatureByCity = async (city: string) => {
	try {
		const response = await fetch(
			`https://wttr.in/${encodeURIComponent(city)}?format=%t`,
		);

		if (!response.ok) {
			return null;
		}

		const tempText = await response.text();
		// Extract number from response like "+15°C" or "-5°C"
		const temp = parseInt(tempText.replace(/[^\d-]/g, ""));
		return temp;
	} catch (error) {
		console.error("Error fetching temperature:", error);
		return null;
	}
};
