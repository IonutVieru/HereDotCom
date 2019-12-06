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

//Traffic overlay
//map.addLayer(defaultLayers.vector.normal.traffic);



// Enable the event system on the map instance:
var mapEvents = new H.mapevents.MapEvents(map);
// Instantiate the default behavior, providing the mapEvents object:
var behavior = new H.mapevents.Behavior(mapEvents);
//Make a request to Here.com API
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    console.log(JSON.stringify(myObj.response.route));
    
    //document.getElementById("demo").innerHTML = myObj.name;
    
  }

};
xmlhttp.open("GET", "https://route.api.here.com/routing/7.2/calculateroute.json?app_id=67Jad2HjPh8wXb3Eau3A&app_code=3hlMkBLEzMRbJp-Aondktw&waypoint0=geo!52.5,13.4&waypoint1=geo!52.5,13.45&mode=fastest;car;traffic:disabled", true);
xmlhttp.send();

//Number of setUpClickListener
var clicks =0;
// Retrieve the mapped positions of the requested waypoints:
var startPoint;
var endPoint;
function setUpClickListener(map) {
  // Attach an event listener to map display
  // obtain the coordinates and display in an alert box.
  map.addEventListener('tap', function (evt) {
  	if (clicks == 0){
  		var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
    console.log(coord.lat);
    group = new H.map.Group();
	// Add the group to the map object (created earlier):
	map.addObject(group);
	// Create a marker:
	marker = new H.map.Marker(coord);
	// Add the marker to the group (which causes 
	// it to be displayed on the map)
	group.addObject(marker);

  		clicks = clicks + 1;
  		console.log(clicks);
  	}
  	else if(clicks == 1){
    var coord = map.screenToGeo(evt.currentPointer.viewportX,
            evt.currentPointer.viewportY);
    console.log(coord.lat);
    group = new H.map.Group();
	// Add the group to the map object (created earlier):
	map.addObject(group);
	// Create a marker:
	marker = new H.map.Marker(coord);
	// Add the marker to the group (which causes 
	// it to be displayed on the map)
	group.addObject(marker);


		
	clicks = 0;
	}
  });

}

setUpClickListener(map);

// Create the parameters for the routing request:
	var routingParameters = {
  // The routing mode:
  'mode': 'fastest;car',
  // The start point of the route:
  'waypoint0': '50.1120423728813,8.68340740740811',
  // The end point of the route:
  'waypoint1': '52.5309916298853,13.3846220493377',
  // To retrieve the shape of the route we choose the route
  // representation mode 'display'
  'representation': 'display'
}

// Retrieve the target element for the map:
var targetElement = document.getElementById('map');
//Request for the traffic information
//https://traffic.api.here.com/traffic/6.2/flow/xml/8/134/86?app_id=67Jad2HjPh8wXb3Eau3A&app_code=3hlMkBLEzMRbJp-Aondktw




// Define a callback function to process the routing response:
var onResult = function(result) {

	// Create the parameters for the routing request:

  var route,
    routeShape,
    startPoint,
    endPoint,
    linestring;
  if(result.response.route) {
  // Pick the first route from the response:
  route = result.response.route[0];
  // Pick the route's shape:
  routeShape = route.shape;

  // Create a linestring to use as a point source for the route line
  linestring = new H.geo.LineString();

  // Push all the points in the shape into the linestring:
  routeShape.forEach(function(point) {
    var parts = point.split(',');
    linestring.pushLatLngAlt(parts[0], parts[1]);
  });

  // Retrieve the mapped positions of the requested waypoints:
  startPoint = route.waypoint[0].mappedPosition;
  endPoint = route.waypoint[1].mappedPosition;

  // Create a polyline to display the route:
  var routeLine = new H.map.Polyline(linestring, {
    style: { strokeColor: 'blue', lineWidth: 3 }
  });

  // Create a marker for the start point:
  var startMarker = new H.map.Marker({
    lat: startPoint.latitude,
    lng: startPoint.longitude
  });

  // Create a marker for the end point:
  var endMarker = new H.map.Marker({
    lat: endPoint.latitude,
    lng: endPoint.longitude
  });

  // Add the route polyline and the two markers to the map:
  map.addObjects([routeLine, startMarker, endMarker]);

  // Set the map's viewport to make the whole route visible:
  map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
  }
};

// Get an instance of the routing service:
var router = platform.getRoutingService();


// router.calculateRoute(routingParameters, onResult,
//   function(error) {
//     alert(error.message);
//   });


var reader = new H.data.geojson.Reader('data.json');
reader.parse();
// Assumption: map already exists
map.addLayer(reader.getLayer());

// https://traffic.api.here.com/traffic/6.2/flow.xml?quadkey=12020330&app_code=3hlMkBLEzMRbJp-Aondktw&app_id=67Jad2HjPh8wXb3Eau3A
// https://tiles.traffic.api.here.com/traffic/6.0/tiles/8/134/86/256/png32?app_id=67Jad2HjPh8wXb3Eau3A&app_code=3hlMkBLEzMRbJp-Aondktw

//Traffic map tile request
//https://1.traffic.maps.api.here.com/maptile/2.1/traffictile/newest/normal.day/13/4380/2562/512/png8?app_id=67Jad2HjPh8wXb3Eau3A&app_code=3hlMkBLEzMRbJp-Aondktw
