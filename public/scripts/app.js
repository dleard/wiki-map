

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

  $("#profile-toggle").click(function(){
    $('#profile-toggle').slideToggle('slow'); 
      //toggle( "slide", {direction: 'right'});
      //animate({width:'toggle'},350);
  });

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
    article.data("mapid", mapObject.id);
    
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
      const {mapid} = $(this).data();
      
      $.ajax({
        method: "GET",
        url: `/api/maps/${mapid}`
      }).done((markers) => {
        console.log('AJAX GET MARKERS DONE');
        console.log(markers);
        initMap(markers[0].startlat, markers[0].startlong);
        $("#meta-pane").find('h3')[0].innerHTML = `<img src = ${avatar}></img>${handle}`;
        $('#meta-pane').find('h2')[0].innerHTML = `${title}`;
        
      });;
    });
  }

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

