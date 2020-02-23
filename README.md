# Mapping Earthquakes

## Project Overview
To use the Leaflet.js Application Programming Interface (API) to populate a geographical map with GeoJSON earthquake data from a URL. Each earthquake will be visually represented by a circle and color, where a higher magnitude will have a larger diameter and will be darker in color. In addition, each earthquake will have a popup marker that, when clicked, will show the magnitude of the earthquake and the location of the earthquake.

### Resources
- Data source: GeoJSON/PB2002_boundaries.json, USGS 7-day earthquake data (earthquakes/feed/v1.0/summary/all_week.geojson)
- Software: Visual Studio Code 1.40.2, JavaScript (ES6), HTML, GitHub, Mapbox
- JavaScript libraries: D3, Leaflet

### Project Objective
To visually show the differences between the magnitudes of earthquakes all over the world for the last seven days. Addiionally, to add tectonic plate GeoJSON data to the map to illustrate the relationship between the location and frequency of seismic activity and tectonic plates.

### Project Summary
A map was created to display the placement of tectonic plates and the location of earthquakes from the past 7 days. Earthquake locations, and tectonic plate data were added as individual overlays, so that the user has an option to toggle off and on the data. In addition to multiple overlays, there are three map themes - Street, Satellite, and Dark - that the user can choose from for their preferred viewing option. 
To make this map interactive, when the user clicks a marker there is a popup that displays the magnitude and location of each earthquake.  

### An image displaying the completed map
![map](https://github.com/hillarykrumbholz/Mapping_Earthquakes/blob/master/map_Challenge.png)
