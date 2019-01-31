$(() => {
  
  function initMap() {

    // Create a new StyledMapType object, passing it an array of styles,
    // and the name to be displayed on the map type control.
    var styledMapType = new google.maps.StyledMapType([
  {
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#242f3e"
  }
  ]
  },
  {
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#746855"
  }
  ]
  },
  {
  "elementType": "labels.text.stroke",
  "stylers": [
  {
    "color": "#242f3e"
  }
  ]
  },
  {
  "featureType": "administrative.land_parcel",
  "elementType": "geometry.fill",
  "stylers": [
  {
    "weight": 1
  }
  ]
  },
  {
  "featureType": "administrative.locality",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#ead2a3"
  }
  ]
  },
  {
  "featureType": "administrative.neighborhood",
  "stylers": [
  {
    "color": "#dec8a5"
  },
  {
    "visibility": "off"
  }
  ]
  },
  {
  "featureType": "poi",
  "elementType": "labels.text",
  "stylers": [
  {
    "visibility": "off"
  }
  ]
  },
  {
  "featureType": "poi",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#d59563"
  }
  ]
  },
  {
  "featureType": "poi.park",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#263c3f"
  }
  ]
  },
  {
  "featureType": "poi.park",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#6b9a76"
  }
  ]
  },
  {
  "featureType": "road",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#38414e"
  }
  ]
  },
  {
  "featureType": "road",
  "elementType": "geometry.stroke",
  "stylers": [
  {
    "color": "#212a37"
  }
  ]
  },
  {
  "featureType": "road",
  "elementType": "labels",
  "stylers": [
  {
    "visibility": "off"
  }
  ]
  },
  {
  "featureType": "road",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#9ca5b3"
  }
  ]
  },
  {
  "featureType": "road.highway",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#decaac"
  }
  ]
  },
  {
  "featureType": "road.highway",
  "elementType": "geometry.stroke",
  "stylers": [
  {
    "color": "#1f2835"
  }
  ]
  },
  {
  "featureType": "road.highway",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#f3d19c"
  }
  ]
  },
  {
  "featureType": "transit",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#2f3948"
  }
  ]
  },
  {
  "featureType": "transit.station",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#d59563"
  }
  ]
  },
  {
  "featureType": "water",
  "elementType": "geometry",
  "stylers": [
  {
    "color": "#17263c"
  }
  ]
  },
  {
  "featureType": "water",
  "elementType": "labels.text",
  "stylers": [
  {
    "visibility": "off"
  }
  ]
  },
  {
  "featureType": "water",
  "elementType": "labels.text.fill",
  "stylers": [
  {
    "color": "#515c6d"
  }
  ]
  },
  {
  "featureType": "water",
  "elementType": "labels.text.stroke",
  "stylers": [
  {
    "color": "#17263c"
  }
  ]
  }
  ],
  {name: 'Styled Map'});

  // Create a map object, and include the MapTypeId to add
  // to the map type control.
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 48.427, lng: -123.367},
    zoom: 13,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
              'styled_map']
    }
  });


  //Associate the styled map with the MapTypeId and set it to display.
  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');
  }

  initMap();
});