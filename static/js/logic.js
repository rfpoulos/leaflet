const main = async () => {
	const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
	const results = await fetch(url)
	const earthquakeData = await results.json();

	const features = earthquakeData.features;
	
	const map = initMap();
	
	features.forEach(feature => {
		const coords = feature.geometry.coordinates;
		const lat = coords[0];
		const lng = coords[1];
		const { mag, time } = feature.properties;
		const date = new Date(time);
		if (lat && lng) {
			const circle = L.circle([lng, lat], {
				color: 'red',
				fillColor: '#f03',
				fillOpacity: mag * .1,
				radius: mag * 6000
			})
			.bindPopup(`Magnitude: ${mag} Time: ${date.toUTCString()} `)
			.addTo(map);

		}
	});

}

main();

const initMap = () => {
	const map = L.map('map', {
		center: [38.0283, -98.5795],
		zoom: 5
	});

	const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
		maxZoom: 19,
		attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});

	tiles.addTo(map);
	return map;
}