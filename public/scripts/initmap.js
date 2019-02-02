let map;

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
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 48.427, lng: -123.367},
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

    // $("#test").on('click', () => {
    //   console.log('hit');
    // });

    function tester(){
      console.log('test');
    }

    function saveData() {
      console.log("saving data!");
      var name = escape(document.getElementById('name').value);
      var address = escape(document.getElementById('address').value);
      var type = document.getElementById('type').value;
      var latlng = marker.getPosition();
      var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
                '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

      downloadUrl(url, function(data, responseCode) {

        if (responseCode == 200 && data.length <= 1) {
          infowindow.close();
          messagewindow.open(map, marker);
        }
      });
    }

    

    function downloadUrl(url, callback) {
      var request = window.ActiveXObject ?
          new ActiveXObject('Microsoft.XMLHTTP') :
          new XMLHttpRequest;

      request.onreadystatechange = function() {
        if (request.readyState == 4) {
          request.onreadystatechange = doNothing;
          callback(request.responseText, request.status);
        }
      };

      request.open('GET', url, true);
      request.send(null);
    }

    function doNothing () {
    }
    
    //Associate the styled map with the MapTypeId and set it to display.
    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');
}

function populateMarkers(markersdata){
  locationwindow = new google.maps.InfoWindow();
  console.log('inside populate');
  
  let markers = [];
  // let infowindows = [];
  let i = 0;
  console.log(markersdata[0]);
  markersdata[0].forEach(marker => {
    console.log(marker);
    let location = {lat: marker.lat, lng: marker.long};
    markers[i] = new google.maps.Marker({position: location, map: map});
    // infowindows[i] = new google.maps.InfoWindow({
    //  content: 
    //});
    //console.log(infowindows[i]);
    //infowindows[i].open(map, markers[i]);

    markers[i].addListener('click', function(event) {
      console.log('click found!');
      locationwindow.close(); // Close previously opened infowindow
      locationwindow.setContent( `<div style='float:left'><img src=${marker.imgsrc}></div><div style='float:right; padding: 10px;'><b>${marker.name}</b><br/>${marker.address}<br/>${marker.type}</div>`);
      locationwindow.open(map, markers[i]);
      console.log('click ended');
    });

    // google.maps.event.addListener(markers[i], "click", function () {
    //   console.log('assign success');
    //   infowindows[i].open(map, markers[i]);
      
    // });
    i++;
  });



  
  // for (const marker of markersdata) {
  //   let location = {lat: marker.lat, lng: marker.long};
  //   markers[i] = new google.maps.Marker({position: location, map: map});
  //   infowindows[i] = new google.maps.InfoWindow({
  //     content: `<div style='float:left'><img src=${marker.imgsrc}></div><div style='float:right; padding: 10px;'><b>${marker.name}</b><br/>${marker.address}<br/>${marker.type}</div>`
  //   });
  //   google.maps.event.addListener(markers[i], "click", function () {
  //     infowindows[i].open(map, marker);
  //   });
  // }
}
