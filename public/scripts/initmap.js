let map;

function initMap(lat, long) {

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
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: lat || 48.427, lng: long || -123.367},
      zoom: 13,
      mapTypeControlOptions: {
        mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
      }
    });

    infowindow = new google.maps.InfoWindow({
      content: document.getElementById('form')
    });

    messagewindow = new google.maps.InfoWindow({
      content: document.getElementById('message')
    });

    google.maps.event.addListener(map, 'click', function(event) {
      
      marker = new google.maps.Marker({
        position: event.latLng,
        map: map
      });


      google.maps.event.addListener(marker, 'click', function() {
        $('#form').css('display', 'block');
        infowindow.open(map, marker);
      });
    });

    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

function populateMarkers(markersdata){
  locationwindow = new google.maps.InfoWindow();
  let markers = [];
    for (key in markersdata) {
      markersdata[key].editPara = 'edit$' + markersdata[key].id;
      markersdata[key].deletePara = 'delete$' + markersdata[key].id;
      const markerData = markersdata[key];
      let location = {lat: markerData.lat, lng: markerData.long};
      const marker = new google.maps.Marker({position: location, map: map});
      marker.addListener('click', function(event) {
        let editPara = '';
        editPara += 'edit$' + markerData.markerid;
        let deletePara = '';
        deletePara += 'delete$' + markerData.markerid;
        locationwindow.close(); // Close previously opened infowindow
        locationwindow.setContent( `<div class='location-info'><div style='float:left'>
        <img style='width:120px' src=${markerData.imgsrc}></div><div style='float:right; padding: 10px;'>
        <p><b>${markerData.name}</b></p><br/><p>Address:<br/>${markerData.address}</p><br/>
        <p>Location Type: ${markerData.type}</p>
        <input id='edit-btn' type='button' onclick="editLocationData('${markerData.editPara}')" value='Edit'/>
        <input id='delete-btn' type='button' onclick="editLocationData('${markerData.deletePara}')" value='Delete'/></td></div></div>`);
        locationwindow.open(map, marker);
      
    });
    markers.push(marker);
  };
}
