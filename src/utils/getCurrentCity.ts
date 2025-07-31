export const getCurrentCity = () => {
	return new Promise((resolve) => {
		navigator.geolocation.getCurrentPosition(
			async (position) => {
				try {
					const { latitude, longitude } = position.coords;

					const response = await fetch(
						`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`,
					);
					const data = await response.json();

					const city =
						data.address.city || data.address.town || data.address.village;
					resolve(city);
				} catch (error) {
					resolve("Kyiv");
				}
			},
			(error) => {
				console.log(error)
				resolve("Kyiv");
			},
		);
	});
};
