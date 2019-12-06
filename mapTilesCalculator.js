//Calculating the map tiles

var lat = 55.703934, // Latitude
lon = 12.485140,    // Longitude
z = 13,        // Zoom level
latRad,
n,
xTile,
yTile;

latRad = lat * Math.PI / 180;
n = Math.pow(2, z);
xTile = n * ((lon + 180) / 360);
yTile = n * (1-(Math.log(Math.tan(latRad) + 1/Math.cos(latRad)) /Math.PI)) / 2;
console.log("zoom level=" + z)
console.log("X tile coord= "+xTile);
console.log("Y tile coord="+yTile);



function tileXYToQuadKey(xTile, yTile, z) {
  var quadKey = "";
  for (var i = z; i > 0; i--) {
    var digit = "0",
    mask = 1 << (i - 1);
    if ((xTile & mask) != 0) {
      digit++;
    }
    
    if ((yTile & mask) != 0) {
      digit = digit + 2; 
    }
    quadKey += digit;
  } // for i return quadKey; 
  console.log("Quadkey="+quadKey);
  return quadKey;
}
tileXYToQuadKey(xTile, yTile, z);