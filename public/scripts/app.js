const login = false;

let testMarkers = {

    0:{
    name: 'Home',
    address: '123 Cool Guy Ln',
    lat: 48.427,
    long: -123.367,
    type: 'bar',
    imgsrc: 'https://img00.deviantart.net/0418/i/2012/038/b/2/jake_the_dog_shimeji___fixed_by_wtfnel-d4oxwq9.png'
  },
    1:{
      name: 'Home2',
      address: '125 Cool Guy Ln',
      lat: 48.527,
      long: -123.467,
      type: 'bar',
      imgsrc: 'https://img00.deviantart.net/0418/i/2012/038/b/2/jake_the_dog_shimeji___fixed_by_wtfnel-d4oxwq9.png' 
    }
  
};

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

  initMap();

  if (!login) {
    console.log("NOT LOGGED IN");
  }

  
  $('#toggle-profile-panel').on('click', () => {
    $('#profile-toggle').slideToggle('slow', () => {});
  });
  
  let testMap = {
    creatorid: 1,
    handle: "DemoDan",
    imgsrc: "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
    id: 1,
    likes: 5,
    city: 'Victoria',
    name: "Places I Hate",
    startlat: 48.422,
    startlong: -123.362,
    type: "Custom"
   }
 
  function createMapEntry(mapObject){
    //do biz
    const article = $('<article>').addClass("maplisting");
    article.data("mapid", mapObject.id)
    .data("creatorId", mapObject.creatorid);
    
    const avatar = $('<img>').addClass("logo").attr('src', mapObject.avatar).attr('width', '50px').attr('height', '50px').appendTo(article);
    const h3 = $('<h3>').text(mapObject.name).appendTo(article);
    const footer = $('<footer>').appendTo(article);
    const h4_1 = $('<h4>').text(mapObject.handle).appendTo(footer);
    const h4_2 = $('<h4>').text(mapObject.city).appendTo(footer);
    const h4_3 = $('<h4>').text(mapObject.type).appendTo(footer);
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
      });;
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
        console.log("GET USER DONE")
        $('#profile-header').find('img')[0].src =`${user.avatar}`; 
        $('#profile-header').find('h3')[0].innerText =`${user.handle}`;
        $('#profile-header').data({id: `${user.id}`});
        attachProfileButtonListeners();
      }); 
    });
  }

  // GET A USER'S MAPS - render maps to browser pane
  const attachProfileButtonListeners = () => {
    const {id} = $('#profile-header').data();
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
  populateMarkers(testMarkers);
//  END OF app.js  //
});
