

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

$(() => {
  initMap();

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
  /* 
  $("#profile-toggle").click(function(){
    $('#profile-toggle').slideToggle('slow'); 
      //toggle( "slide", {direction: 'right'});
      //animate({width:'toggle'},350);
  });
  */

  // function saveData() {
  //   console.log("saving data!");
  //   var name = escape(document.getElementById('name').value);
  //   var address = escape(document.getElementById('address').value);
  //   var type = document.getElementById('type').value;
  //   var latlng = marker.getPosition();
  //   var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
  //             '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

  //   downloadUrl(url, function(data, responseCode) {

  //     if (responseCode == 200 && data.length <= 1) {
  //       infowindow.close();
  //       messagewindow.open(map, marker);
  //     }
  //   });
  // }

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

  //
  // RENDER IMPORT
  //

  function renderMaps(dataObj){
    for (const obj of dataObj) {
      var $map = createMapEntry(obj);
      $('.maplist-container').prepend($map); 
    }   
    attachMapClickListener();
  }

  //$('.maplist-container').prepend(createMapEntry(testMap));

  //
  // RENDER IMPORT END
  //


  // *** MAP AJAX FUNCTIONS ***

  // GET ALL MAPS
  const getAllMaps = () => {
    $.ajax({
      method: "GET",
      url: "/api/maps"
    }).done((maps) => {
      console.log('AJAX GET MAPS DONE');
      renderMaps(maps);
    });;
  }

  // GET 1 MAP AND ALL MARKERS
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
        //initMap(markers[0].startlat, markers[0].startlong);
        $("#meta-pane").find('h3')[0].innerHTML = `<img src = ${avatar}></img>${handle}`;
        $('#meta-pane').find('h2')[0].innerHTML = `${title}`;
        $('#meta-pane').data({id: creatorId});
        attachMetaPaneHandleListener();
      });;
    });
  }

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
        $('.maplist-container')[0].innerHTML = '';
        renderMaps(maps);
      });;
    });
    $('#profile-body').find('button:nth-of-type(3)').on('click', function() {
      console.log(`button THREE clicked on user ${$('#profile-header').data().id}'s profile`);
    });
  }


  // X app.GET(‘/user/:id//maps’)
	// Get a user’s maps
	// 	Filtering done client-side
	// TABLE: MAP JOIN USER ON (CREATORID = USER.ID)


  // <div id='profile-header' style = 'text-align = center; padding: 5px 3px 3px 5px'>
  //             <img style = "float: left"src = "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" />
  //             <h3>Handle</h3>
  //           </div>
  //             <div id='profile-body'>
  //               <div class="btn-group-vertical">
  //               <button type="button" class="btn btn-primary">Created</button>
  //               <button type="button" class="btn btn-primary">Contributed To</button>
  //               <button type="button" class="btn btn-primary">Favorited</button>
  //             </div>
  //           </div>
  
  getAllMaps();
//  END OF app.js  //
});

/*  EXAMPLE OF HTML FOR MAP BROWSER 

<article class="maplisting">  
                
                <img class="logo" src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" width="50px" height="50px">
                <h3>Where to find dilly bars</h3>
                
                <footer>
                  <h4>@DanDangler</h4>
                  <h4>Victoria</h4>
                  <h4>Food</h4>
                </footer>
             
          </article> 
*/

