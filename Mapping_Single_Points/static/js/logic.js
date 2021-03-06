// Add console.log to check to see if our code is working.
console.log("working");

// Create the map object with a center and zoom level.
let map = L.map('mapid').setView([34.0522, -118.2437], 14);

// Create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	id: 'mapbox.streets',
	accessToken: API_KEY
});
// Then we add our 'graymap' tile layer to the map.
streets.addTo(map);

//  Add a marker to the map for Los Angeles, California.
var marker = L.marker([34.0522, -118.2437], 4).addTo(map);

// // Adding a circle
// let circle = L.circle([34.0522, -118.2437], {
// 	radius: 100
//  }).addTo(map);

 // Add circle marker - this will create a larger radius over the point
let circleMarker = L.circleMarker([34.0522, -118.2437], {
	radius: 300,
	color: "black",
	fillColor: "#ffffa1",
	fillOpacity: 0.2
 }).addTo(map);