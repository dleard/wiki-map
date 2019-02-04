let siteUser;

const containsEncodedComponents = (x) => {
  x.split('%20').join(' ');
  return x
}

const saveData = (id) => {
  console.log("saving data!");
  const markerObj = {};
  if (id) {
    $.ajax({
      method: "GET",
      url: `/api/markers/${id}`
    }).done((marker) => {
      //logic for put
      markerObj.id = id;
      markerObj.name = containsEncodedComponents(document.getElementById('name').value);
      markerObj.address = containsEncodedComponents(document.getElementById('address').value);
      markerObj.type = document.getElementById('type').value;
      markerObj.description = document.getElementById('description').value;
      markerObj.lat =  marker.lat;
      markerObj.long = marker.long;
      markerObj.imgsrc = document.getElementById('imgsrc').value;
      markerObj.contributorid = marker.contributorid;
      markerObj.mapid = marker.mapid;
      $('#message').css('visibility', 'visible');

      $.ajax({
        method: "PUT",
        url: `/api/markers/${id}`,
        data: markerObj
      }).done(() => {
        console.log(`Marker changed`);
      });
    });
  } else {
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
  }
  $('#message').css('visibility', 'visible');

  $.ajax({
    method: "POST",
    url: '/api/markers',
    data: markerObj
  }).done (() => {
    console.log(`Marker with name: ${markerObj.name} added`);
  });
  
}


const editLocationData = (value) => {
  let input = value;
  let values = input.split('$');
  let deleteObj = {};
  deleteObj.id = values[1];
  const newContent = `
  <div style="width: 260px; height: 200px; padding: 1px; float:left">
  <form>
        <table>
        <tr><td>Name:</td> <td><input type='text' id='name'/> </td> </tr>
        <tr><td>Address:</td> <td><input type='text' id='address'/> </td> </tr>
        <tr><td>Description:</td> <td><input type='text' id='description'/> </td> </tr>
        <tr><td>Image URL:</td> <td><input type='text' id='imgsrc'/> </td> </tr>
        <tr><td>Type:</td> <td><select style='float: right' id='type'> +
                    <option value='Food' SELECTED>Food</option>
                    <option value='Entertainment'>Entertainment</option>
                    <option value='Entertainment'>Nature</option>
                    <option value='Custom'>Custom</option>
                    </select> </td></tr>           
                    <tr><td></td>
                    <div style='display: inline-block'> 
                      <td><input type='button' value='Save' onclick='saveData(${values[1]})'/>
                      <td></td>
                    </div>
                  </tr>
        </table>
        <div style='visibility: hidden' id="message">Location saved</div>
        
      <form></div>`;
  if (values[0] === 'edit') {
    $('.location-info')[0].innerHTML = newContent;
  }

  if (values[0] === 'delete') {
    deleteMarker(values[2]);
    $.ajax({
      method: "DELETE",
      url: `/api/markers/${values[1]}`,
      data: deleteObj
    }).done(() => {
      console.log(`Marker deleted!`);
    });;
  }
}

const doNothing = () => {
  console.log('Nothing done! Wait...shit');
}

$(() => {
  
  initMap();

  if (siteUser) {
    $('#my-profile').css('visibility', 'visible');
    $('#profile-toggle').css('visibility', 'visible');
    $('#toggle-profile-panel').css('visibility', 'visible');
    $('#no-user').css('display', 'none');
  }

  // displays user profile information in the profile pane
  const displayUser = (user) => {
    if (siteUser) {
    $('#my-profile').css('visibility', 'visible');
    $('#toggle-profile-panel').css('visibility', 'visible');
    }
    $('#profile-toggle').css('visibility', 'visible');
    
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

  // Toggle favorite button
  $('.glyphicon-star').on('click', (event => {
    console.log('here');
    const newFav = {mapid: $('#meta-pane').data().mapid, userid: $('#profile-header').data().id};
    if ($('.glyphicon-star').data().favorite === 'yes') {
      $('.glyphicon-star').css('color', '');
      $('.glyphicon-star').data({favorite:'no'});
      $.ajax({
        method: "DELETE",
        url: `/api/favorites/${newFav.userid}/${newFav.mapid}`,
        data: newFav
      }).done ((result) => {
        console.log(`Favorite removed`);
        $('.glyphicon-star').css('color', '');
        $('.glyphicon-star').data({favorite: 'no'});
      });
    } else {
      $.ajax({
        method: "POST",
        url: '/api/favorites',
        data: newFav
      }).done ((result) => {
        console.log(`New favorite with id: ${result} added`);
        $('.glyphicon-star').css('color', 'yellow');
        $('.glyphicon-star').data({favorite: 'yes'});
      });
    }
  }));
  
  // BROWSER FILTER BUTTONS

  $('#filter-buttons').find('button:nth-of-type(1)').on('click', (event) => {
    event.preventDefault();
    $('.maplist-container')[0].innerHTML = '';
    getAllMaps();
  });
  $('#filter-buttons').find('button:nth-of-type(2)').on('click', (event) => {
    event.preventDefault();
    getFilteredMaps('food');
  });  
  $('#filter-buttons').find('button:nth-of-type(3)').on('click', (event) => {
    event.preventDefault();
    getFilteredMaps('entertainment');
  });  
  $('#filter-buttons').find('button:nth-of-type(4)').on('click', (event) => {
    event.preventDefault();
    getFilteredMaps('nature');
  });  
  $('#filter-buttons').find('button:nth-of-type(5)').on('click', (event) => {
    event.preventDefault();
    getFilteredMaps('custom');
  });  


  // Log-in button hardcoded for demo
  //initialize window
  /*$('#login-pane').slideUp(`fast`, function(){
    $(this).css("visibility", "visible");
  });

  $('#login-btn').on('click', () => {
    console.log('login pressed!');
    $('#login-pane').slideToggle('slow', () => {});
    
  });*/

  // Toggles show profile pane
  $('#toggle-profile-panel').on('click', (event) => {
    event.preventDefault();
    $('#profile-toggle').slideToggle('slow', () => {});
  });
 
  // Creates each map entry for the browser pane
  const createMapEntry = (mapObject) => {
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
  const renderMaps = (dataObj) => {
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
      $.ajax({
        method: "GET",
        url: `/api/maps/${mapid}/${siteUser.id}`
      }).done(() => {
        $('.glyphicon-star').css('color', 'yellow');
        $('.glyphicon-star').data({favorite: 'yes'});
      }).catch(() => {
        $('.glyphicon-star').css('color', '');
      });
    });

    const getCityGeoLocation = (city) => {
      return new Promise ((resolve, reject) => {
        const geocoder =  new google.maps.Geocoder();
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
    $('#submit-new-map').on('click', (event) => {
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
              getAllMaps();
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
  $('#login-btn').on('click', (event) => {
    event.preventDefault();
    document.cookie = "handle=DemoDan";
    siteUser = {id: 2};
    //$('#login-pane').slideUp(`fast`);
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
    $('#profile-body').find('button:nth-of-type(1)').on('click', () => {
      $.ajax({
        method: "GET",
        url: `/api/users/${id}/maps`
      }).done((maps) => {
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
    
    $('#profile-body').find('button:nth-of-type(2)').on('click', () => {
      $.ajax({
        method: "GET",
        url: `/api/users/${id}/maps/contributed`
      }).done((maps) => {
        console.log(maps);
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
    $('#profile-body').find('button:nth-of-type(3)').on('click', () => {
      $.ajax({
        method: "GET",
        url: `/api/users/${id}/maps/favorited`
      }).done((maps) => {
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
  }

  getAllMaps();
 
//  END OF app.js  //
});
