var locations = [
  ["Split",     43.5148515, 16.4490835],
  ["Zagreb",    45.840196,  15.9643316],
  ["Dubrovnik", 42.6457256, 18.094058]
];

function initGoogleMap(){

  var infowindow = new google.maps.InfoWindow(); /* SINGLE */
  var map = new google.maps.Map(document.getElementById('map-canvas'), {
      zoom: 4,
      center: new google.maps.LatLng(45, 15)
  });
  
  function placeMarker( loc ) {
    var latLng = new google.maps.LatLng( loc[1], loc[2]);
    var marker = new google.maps.Marker({
      position : latLng,
      map      : map
    });
    google.maps.event.addListener(marker, 'click', function(){
        infowindow.close(); // Close previously opened infowindow
        infowindow.setContent( "<div id='infowindow'>"+ loc[0] +"</div>");
        infowindow.open(map, marker);
    });
  }
  
  // ITERATE ALL LOCATIONS
  // Don't create functions inside for loops
  // therefore refer to a previously created function
  // and pass your iterating location as argument value:
  for(var i=0; i<locations.length; i++) {
    placeMarker( locations[i] );
  } 
  
}
google.maps.event.addDomListener(window, 'load', initGoogleMap);