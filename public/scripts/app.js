const login = false;


function containsEncodedComponents(x) {
  x.split('%20').join(' ');
  return x
}

function saveData() {
  console.log("saving data!");
  let markerObj = {};
  let latlng = marker.getPosition();

  markerObj.name = containsEncodedComponents(document.getElementById('name').value);
  markerObj.address = containsEncodedComponents(document.getElementById('address').value);
  markerObj.type = document.getElementById('type').value;
  markerObj.description = document.getElementById('description').value;
  markerObj.lat =  latlng.lat();
  markerObj.long = latlng.lng();
  markerObj.imgsrc = document.getElementById('imgsrc').value;
  markerObj.contributorid = $('#meta-pane').data().id;
  markerObj.mapid = $('#meta-pane').data().mapid;

  $('#message').css('visibility', 'visible');

  $.ajax({
    method: "POST",
    url: '/api/markers',
    data: markerObj
  }).done (() => {
    console.log(`Marker with name: ${markerObj.name} added`);
  });
}

function doNothing () {
  console.log('Nothing done! Wait...shit');
}

$(() => {
  let siteUser=1;
  
  initMap();

  if (siteUser) {
    $('#my-profile').css('visibility', 'visible');
    $('#profile-toggle').css('visibility', 'visible');
    $('#toggle-profile-panel').css('visibility', 'visible');
    $('#no-user').css('display', 'none');
  }

  // displays user profile information in the profile pane
  const displayUser = (user) => {
    $('#my-profile').css('visibility', 'visible');
    $('#profile-toggle').css('visibility', 'visible');
    $('#toggle-profile-panel').css('visibility', 'visible');
    $('#no-user').css('display', 'none');
    $('#profile-header').find('img')[0].src =`${user.avatar}`; 
    $('#profile-header').find('h3')[0].innerText =`${user.handle}`;
    $('#profile-header').data({id: `${user.id}`});
    attachProfileButtonListeners();
  }

  // TOGGLE FUNCTIONS

  // Renders the currently logged in user's profile in the profile pane
  $('#my-profile').on('click', (event) => {
    event.preventDefault();
    displayUser(siteUser);
  });  
  
  // Create new map button
  $('#newMap').on('click', (event) => {
    event.preventDefault();
    $('#create-map-form').css('visibility', 'visible');
  });
  
  // BROWSER FILTER BUTTONS

  $('#filter-buttons').find('button:nth-of-type(1)').on('click', function(event) {
    event.preventDefault();
    $('.maplist-container')[0].innerHTML = '';
    getAllMaps();
  });
  $('#filter-buttons').find('button:nth-of-type(2)').on('click', function(event) {
    event.preventDefault();
    getFilteredMaps('food');
  });  
  $('#filter-buttons').find('button:nth-of-type(3)').on('click', function(event) {
    event.preventDefault();
    getFilteredMaps('entertainment');
  });  
  $('#filter-buttons').find('button:nth-of-type(4)').on('click', function(event) {
    event.preventDefault();
    getFilteredMaps('nature');
  });  
  $('#filter-buttons').find('button:nth-of-type(5)').on('click', function(event) {
    event.preventDefault();
    getFilteredMaps('custom');
  });  

  //initialize window
  $('#login-pane').slideUp(`fast`, function(){
    $(this).css("visibility", "visible");
  });

  // Toggles login form
  $('#login-btn').on('click', () => {
    console.log('login pressed!');
    $('#login-pane').slideToggle('slow', () => {});
    
  });

  // Toggles show profile pane
  $('#toggle-profile-panel').on('click', (event) => {
    event.preventDefault();
    $('#profile-toggle').slideToggle('slow', () => {});
  });
 
  // Creates each map entry for the browser pane
  function createMapEntry(mapObject){
    //do biz
    const article = $('<article>').addClass("maplisting");
    article.data("mapid", mapObject.id)
    .data("creatorId", mapObject.creatorid);
    
    $('<img>').addClass("logo").attr('src', mapObject.avatar).attr('width', '50px').attr('height', '50px').appendTo(article);
    $('<h3>').text(mapObject.name).appendTo(article);
    const footer = $('<footer>').appendTo(article);
    const table = $('<table>').appendTo(footer);
    const row = $('<tr>').appendTo(table);
    let cell = $('<td>').appendTo(row);
    $('<h4>').text(mapObject.handle).appendTo(cell);
    cell= $('<td>').appendTo(row);
    $('<h4>').text(mapObject.city).appendTo(cell);
    cell = $('<td>').appendTo(row);
    $('<h4>').text(mapObject.type).appendTo(cell);
    return article
  }

  // Render maps to browser pane
  function renderMaps(dataObj){
    for (const obj of dataObj) {
      var $map = createMapEntry(obj);
      $('.maplist-container').prepend($map); 
    }   
    attachMapClickListener();
  }

  // *** MAP AJAX FUNCTIONS ***

  // GET ALL MAPS - render maps to browser pane
  const getAllMaps = () => {
    $.ajax({
      method: "GET",
      url: "/api/maps"
    }).done((maps) => {
      console.log('AJAX GET MAPS DONE');
      renderMaps(maps);
    });;
  }

  // GET FILTERED MAPS - render maps to browser pane
  const getFilteredMaps = (filter) => {
    $.ajax({
      method: "GET",
      url: `/api/maps/filter/${filter}`
    }).done((maps) => {
      console.log('AJAX GET FILTERED MAPS DONE');
      $('.maplist-container')[0].innerHTML = '';
      renderMaps(maps);
    });;
  }

  // GET 1 MAP AND ALL MARKERS - render map to map window
  const attachMapClickListener = () => {
    $('.maplisting').on('click', function() {
      const title = $(this).find('h3')[0].innerText;
      const handle = $(this).find('h4')[0].innerText;
      const avatar = $(this).find('img')[0].currentSrc;
      const {mapid, creatorId} = $(this).data();
      $.ajax({
        method: "GET",
        url: `/api/maps/${mapid}`
      }).done((markers) => {
        console.log('AJAX GET MARKERS DONE');
        console.log(markers);
        $("#meta-pane").find('h3')[0].innerHTML = `<img src = ${avatar}></img>${handle}`;
        $('#meta-pane').find('h2')[0].innerHTML = `${title}`;
        $('#meta-pane').data({id: creatorId, mapid});
        attachMetaPaneHandleListener();
        populateMarkers(markers);
        if (markers.length === 0) {
          $.ajax({
          method: "GET",
          url: `/api/maps/map/${mapid}`
          }).done((maps) => {
            initMap(maps[0].startlat, maps[0].startlong);
          })
        }
      });;
    });

    function getCityGeoLocation(city) {
      return new Promise ((resolve, reject) => {
        var geocoder =  new google.maps.Geocoder();
        geocoder.geocode( { 'address': `${city}, canada`}, function(results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
            const lat = (results[0].geometry.location.lat());
            const long = results[0].geometry.location.lng();
            const latLng = [lat, long];
            resolve (latLng); 
          } else {
            console.log('fail');
            reject('fail');
          }
        });
      });
     
    }

    // CREATE A NEW MAP
    $('#submit-new-map').on('click', function(event) {
      event.preventDefault();
      const newMapObj = {name: $('#mapNameNew').val(), likes: 0, city: $('#cityNew').val(), type: $('#typeNew').val(), creatorid:`${$('#profile-header').data().id}`}
      getCityGeoLocation($('#cityNew').val())
      .then(
        latLng => {
          newMapObj.startlat = latLng[0];
          newMapObj.startlong = latLng[1];
          $.ajax({
            method: "POST",
            url: '/api/maps',
            data: newMapObj
          }).done ((result) => {
            $.ajax({
              method: "GET",
              url: `/api/maps/${result}`
            }).done((markers) => {
              console.log('AJAX GET MARKERS DONE');
              $("#meta-pane").find('h3')[0].innerHTML = `<img src = ${$('#profile-header').find('img')[0].src}></img>${$('#profile-header').find('h3')[0].innerText}`;
              $('#meta-pane').find('h2')[0].innerHTML = `${newMapObj.name}`;
              $('#meta-pane').data({id: newMapObj.creatorid, mapid: result});
              attachMetaPaneHandleListener();
              populateMarkers(markers);
              initMap(newMapObj.startlat, newMapObj.startlong);
              $('#create-map-form').css('visibility', 'hidden');
            });;
          }); 
        }
      )
    });
  }

  // *** USER AJAX FUNCTIONS ***

  // GET A USER - render details to profile pane
  const attachMetaPaneHandleListener = () => {
    ($('#meta-pane').find('a')).on('click', function() {
      const userId = $(this).parent().parent().data().id;
      $.ajax({
        method: "GET",
        url: `/api/users/${userId}`,
      }).done((user) => {
        displayUser(user);
        console.log("GET USER DONE")        
      }); 
    });
  }

  // GET USER FROM LOGIN
  $('.submit-button').on('click', function(event) {
    event.preventDefault();
    document.cookie = "handle=DemoDan";
    $('#login-pane').slideUp(`fast`);
    $.ajax({
      method: "POST",
      url: "/login",
    }).done(function(user) {
      siteUser = user;
      displayUser(user);
    });
  });

  // GET A USER'S MAPS - render maps to browser pane
  const attachProfileButtonListeners = () => {
    const {id} = $('#profile-header').data();
    if (id == siteUser.id) { $('#newMap').css('visibility', 'visible'); }
    else { $('#newMap').css('visibility', 'hidden'); }
    $('#profile-body').find('button:nth-of-type(1)').on('click', function() {
      $.ajax({
        method: "GET",
        url: `/api/users/${id}/maps`
      }).done((maps) => {
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
    
    $('#profile-body').find('button:nth-of-type(2)').on('click', function() {
      $.ajax({
        method: "GET",
        url: `/api/users/${id}/maps/contributed`
      }).done((maps) => {
        console.log(maps);
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
    $('#profile-body').find('button:nth-of-type(3)').on('click', function() {
      console.log(`button THREE clicked on user ${$('#profile-header').data().id}'s profile`);
    });
  }

  getAllMaps();
 
//  END OF app.js  //
});
