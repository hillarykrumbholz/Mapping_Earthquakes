// Add console.log to check to see if our code is working.
console.log("working");

// SINGLE POINT TYPE

// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// // Add GeoJSON data.
// let sanFranAirport =
// {"type":"FeatureCollection","features":[{
//     "type":"Feature",
//     "properties":{
//         "id":"3469",
//         "name":"San Francisco International Airport",
//         "city":"San Francisco",
//         "country":"United States",
//         "faa":"SFO",
//         "icao":"KSFO",
//         "alt":"13",
//         "tz-offset":"-8",
//         "dst":"A",
// 		"tz":"America/Los_Angeles"
// 	},
//         "geometry":{
//             "type":"Point",
// 			"coordinates":[-122.375,37.61899948120117]
// 		}
// 	}
// ]};

// pointToLayer OPTION
// // Grabbing our GeoJSON data
// L.geoJSON(sanFranAirport, {
// 	// We turn each feature into a marker on the map.
// 	pointToLayer: function(feature, latlng) {
// 		console.log(feature);
// 		return L.marker(latlng)
// 		.bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country + "</h3>");

// 	}
// }).addTo(map);

// // onEachFeature OPTION
// // Grabbing our GeoJSON data
// L.geoJSON(sanFranAirport, {
// 	// We turn each feature into a marker on the map.
// 	onEachFeature: function(feature, layer) {
// 		console.log(layer);
// 		layer.bindPopup("<h3> Airport Code: " + feature.properties.faa + "</h3> <hr> <h3> Airport Name: " + feature.properties.name + "</h3>");
// 	}
// }).addTo(map);

// Create the tile layer that will be the background of our map
let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-day-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/navigation-preview-night-v4/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	Light: light,
	Dark: dark
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [44.0, -80.0],
	zoom: 2,
	layers: [dark]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Accessing the Toronto airline routes GeoJSON URL.
let torontoData = "https://raw.githubusercontent.com/hillarykrumbholz/Mapping_Earthquakes/master/torontoRoutes.json";

// Adding a popup marker to each airport 
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
    console.log(data);
  // Creating a GeoJSON layer with the retrieved data.
  	L.geoJson(data, {
		color: "#ffffa1",
		weight: 2,
		onEachFeature: function(feature, layer) {
			layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr> <h3> Destination: " + feature.properties.dst + "</h3>");
			}
  }).addTo(map);
});
