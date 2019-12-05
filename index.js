 $ = require('jQuery')
// Create a Platform object (one per application):
var platform = new H.service.Platform({
  'apikey': 'M58iAk_ovZJReAS304xYWm6w_xEGT2bmHcxF88KYGzg'
});
// Obtain the default map types from the platform object:
var defaultLayers = platform.createDefaultLayers();

// Instantiate (and display) a map object:
// var map = new H.Map(
//     document.getElementById('map'),
//     defaultLayers.vector.normal.map,
//     {
//       zoom: 12,
//       center: { lat: 52.5, lng: 13.4 }
//     });
// Get an object containing the default map layers:
var defaultLayers = platform.createDefaultLayers();

// Instantiate the map using the vecor map with the
// default style as the base layer:
var map = new H.Map(document.getElementById('map'),
            defaultLayers.vector.normal.map,
           {
      			zoom: 12,
      			center: { lat: 55.671929, lng: 12.358081 }
    		});

map.addLayer(defaultLayers.vector.normal.traffic);



// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);

// Add event listeners:
map.addEventListener('tap', function(evt) {
    // Log 'tap' and 'mouse' events:
    console.log(evt.type, evt.currentPointer.type);
    // Create a group that can hold map objects:
group = new H.map.Group();

// Add the group to the map object (created earlier):
map.addObject(group);

// Create a marker:
marker = new H.map.Marker(map.getCenter());

// Add the marker to the group (which causes 
// it to be displayed on the map)
group.addObject(marker);
});



// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);