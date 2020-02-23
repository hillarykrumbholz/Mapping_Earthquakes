// Add console.log to check to see if our code is working.
console.log("working");

// Create the tile layer that will be the background of our map
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
	maxZoom: 18,
	accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
	"Streets": streets,
  "Satellite": satelliteStreets,
  "Dark": dark
};

// Create the earthquake layer for our map.
let earthquakes = new L.LayerGroup();

// Create the tectonic plates layer for our mamp.
let tectonic = new L.LayerGroup();

// We define an object that contains the overlays.
// This overlay will be visible all the time.
let overlays = {
    Earthquakes: earthquakes,
    "Tectonic Plates": tectonic
};

// Create the map object with center, zoom level and default layer.
let map = L.map('mapid', {
	center: [39.5, -98.5],
	zoom: 3,
	layers: [streets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps, overlays).addTo(map);

// Accessing the earthquake locations from past 7 days GeoJSON URL.
let earthquakes7days = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Accessing the tectonic plate JSON data.
let tectonicPlates = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.
function styleInfo(feature) {
    return {
      opacity: 1,
      fillOpacity: 1,
      fillColor: getColor(feature.properties.mag),
      color: "#000000",
      radius: getRadius(feature.properties.mag),
      stroke: true,
      weight: 0.5
    };
}

// This function determines the radius of the earthquake marker based on its magnitude.
// Earthquakes with a magnitude of 0 will be plotted with a radius of 1.
function getRadius(magnitude) {
    if (magnitude === 0) {
      return 1;
    }
    return magnitude * 4;
}

// This function determines the color of the circle based on the magnitude of the earthquake.
function getColor(magnitude) {
    if (magnitude > 5) {
      return "#eb4747";
    }
    if (magnitude > 4) {
      return "#ffa64d";
    }
    if (magnitude > 3) {
      return "#ffff33";
    }
    if (magnitude > 2) {
      return "#d0fb51";
    }
    if (magnitude > 1) {
      return "#66ffb3";
    }
    return "#1f9393";
}

// Adding a popup marker to each earthquake locations 
// Grabbing our GeoJSON data.
d3.json(earthquakes7days).then(function(data) {
  // Turn each feature into a circleMarker on the map.
  	L.geoJson(data, {
          pointToLayer: function(feature, latlng) {
              console.log(data);
              return L.circleMarker(latlng)
          },
          // Set the style for each circleMarker using our styleInfo function.
          style: styleInfo,
          onEachFeature: function(feature, layer) {
            layer.bindPopup("Magnitude: " + feature.properties.mag + "<br>Location: " + feature.properties.place);    
        }
      }).addTo(earthquakes);
        earthquakes.addTo(map);
});

// Create a legend control object.
let legend = L.control({
    position: "bottomright"
});

// Then add all the details for the legend.
legend.onAdd = function() {
    let div = L.DomUtil.create("div", "info legend"),
            magnitudes = [0, 1, 2, 3, 4, 5],
            colors = [
                "#1f9393",
                "#66ffb3",
                "#d0fb51",
                "#ffff33",
                "#ffa64d",
                "#eb4747"
            ];
        // Looping through our intervals to generate a label with a colored square for each interval.
        for (var i = 0; i < magnitudes.length; i++) {
            console.log(colors[i]);
            div.innerHTML +=
            "<i style='background: " + colors[i] + "'></i> " +
            magnitudes[i] + (magnitudes[i + 1] ? "–" + magnitudes[i + 1] + "<br>" : "+");
        }
        return div;
    };
    legend.addTo(map);

// Grabbing our tectonic plate GeoJSON data.
d3.json(tectonicPlates).then(function(data) {
  console.log(data);
// Creating a GeoJSON layer with the retrieved data.
  L.geoJson(data, {
    color: "#e600ac",
    weight: 4
  }).addTo(tectonic);
  tectonic.addTo(map);
});
