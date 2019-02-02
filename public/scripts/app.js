let testMarkers = {
  0:[
    {
    name: 'Home',
    address: '123 Cool Guy Ln',
    lat: 48.427,
    long: -123.367,
    type: 'bar',
    imgsrc: 'https://img00.deviantart.net/0418/i/2012/038/b/2/jake_the_dog_shimeji___fixed_by_wtfnel-d4oxwq9.png'
  },
    {
      name: 'Home2',
      address: '125 Cool Guy Ln',
      lat: 48.527,
      long: -123.467,
      type: 'bar',
      imgsrc: 'https://img00.deviantart.net/0418/i/2012/038/b/2/jake_the_dog_shimeji___fixed_by_wtfnel-d4oxwq9.png' 
    }
  ]
};

function containsEncodedComponents(x) {
  x.split('%20').join(' ');
  return x
}

function saveData() {
  console.log("saving data!");
  // var name = escape(document.getElementById('name').value);
  // var address = escape(document.getElementById('address').value);
  // var type = document.getElementById('type').value;
  // var latlng = marker.getPosition();
  // var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
  //           '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

  // downloadUrl(url, function(data, responseCode) {

  //   console.log(data);
  //   if (responseCode == 200 && data.length <= 1) {
  //     infowindow.close();
  //     messagewindow.open(map, marker);
  //   }
  // });

  let mapObj = {};
  let latlng = marker.getPosition();

  mapObj.name = containsEncodedComponents(document.getElementById('name').value);
  mapObj.address = containsEncodedComponents(document.getElementById('address').value);
  mapObj.type = document.getElementById('type').value;
  mapObj.lat =  latlng.lat();
  mapObj.long = latlng.lng();
  mapObj.imgsrc = 'dummy';
  mapObj.contributorid = 'dummy';
  mapObj.mapid = 'dummy';

  //mapObj.name = escape(document.getElementById('name').containsEncodedComponents(value));
  //mapObj.address = escape(document.getElementById('address').containsEncodedComponents(value));

  console.log(mapObj);
  //return mapObject
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

// IMPORT MARKER ADD

// function populateMarkers(markersdata){
//   console.log('inside populate');
//   let markers = [];
//   let infowindows = [];
//   let i = 0;
//   markersdata[0].forEach(marker => {
//     let location = {lat: marker.lat, lng: marker.long};
//     markers[i] = new google.maps.Marker({position: location, map: map});
//     infowindows[i] = new google.maps.InfoWindow({
//       content: `<div style='float:left'><img src=${marker.imgsrc}></div><div style='float:right; padding: 10px;'><b>${marker.name}</b><br/>${marker.address}<br/>${marker.type}</div>`
//     });
//     google.maps.event.addListener(markers[i], "click", function () {
//       infowindows[i].open(map, marker);
//     });
//   });
//   // for (const marker of markersdata) {
//   //   let location = {lat: marker.lat, lng: marker.long};
//   //   markers[i] = new google.maps.Marker({position: location, map: map});
//   //   infowindows[i] = new google.maps.InfoWindow({
//   //     content: `<div style='float:left'><img src=${marker.imgsrc}></div><div style='float:right; padding: 10px;'><b>${marker.name}</b><br/>${marker.address}<br/>${marker.type}</div>`
//   //   });
//   //   google.maps.event.addListener(markers[i], "click", function () {
//   //     infowindows[i].open(map, marker);
//   //   });
//   // }
// }

// let markers = [];
// let infowindows = [];
// for (var i = 0; i < coords.length; ++i) {
//     markers[i] = "some stuff";
    
// }

// function initMap() {
//   // The location of Uluru
//   var uluru = {lat: -25.344, lng: 131.036};
//   // The map, centered at Uluru
//   var map = new google.maps.Map(
//       document.getElementById('map'), {zoom: 4, center: uluru});
//   // The marker, positioned at Uluru
//   var marker = new google.maps.Marker({position: uluru, map: map});
// }

// marker = new google.maps.Marker({
//   map: map,
//   position: new google.maps.LatLng(18.5231, -72.2929),
//   icon: "img/mapmarker.png"
// });
// infowindow = new google.maps.InfoWindow({
//   content: "<div style='float:left'><img src='http://i.stack.imgur.com/g672i.png'></div><div style='float:right; padding: 10px;'><b>Title</b><br/>123 Address<br/> City,Country</div>"
// });
// google.maps.event.addListener(marker, "click", function () {
//   infowindow.open(map, marker);
// });
// MARKER ADD END

$(() => {

  initMap();

  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(let user of users) {
      console.log(user);
     // $("<div>").text(user.name).appendTo($("body"));
    }
  });;



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

  // function tester(){
  //   console.log('test');
  // }

  function createMapEntry(mapObject){
    //do biz
    const article = $('<article>').addClass("maplisting");
    
    const avatar = $('<img>').addClass("logo").attr('src', mapObject.imgsrc).attr('width', '50px').attr('height', '50px').appendTo(article);
    const h3 = $('<h3>').text(mapObject.name).appendTo(article);
    const footer = $('<footer>').appendTo(article);
    const h4_1 = $('<h4>').text(mapObject.handle).appendTo(footer);
    const h4_2 = $('<h4>').text(mapObject.city).appendTo(footer);
    const h4_3 = $('<h4>').text(mapObject.type).appendTo(footer);
    // const report = $('<i>').addClass(`fas fa-flag`).addClass(`tweet-btn`).addClass(`report-btn`).appendTo(footer);
    // const retweet = $('<i>').addClass(`fas fa-retweet`).addClass(`tweet-btn`).addClass(`retweet-btn`).appendTo(footer);
    // const like = $('<i>').addClass(`fas fa-heart tweet-btn like-btn`).data( "liked", false ).appendTo(footer);
    // const likeCount = $('<h3>').text(tweet.likes).data("t-id", tweet.tuid).addClass(`like-count`).appendTo(footer);
    return article
  }

  //
  // RENDER IMPORT
  //

  function renderTweets(dataObj){
    for (const obj of dataObj) {
      var $map = createMapEntry(obj);

      // Test / driver code (temporary)
      $('.maplist-container').prepend($map); 
    }   
  }

  $('.maplist-container').prepend(createMapEntry(testMap));
  console.log('calling populate');
  populateMarkers(testMarkers);
  //
  // RENDER IMPORT END
  //

  // $("#form").on('submit', function(event) {
  //   event.preventDefault();
  //   console.log('hit');

  // });



});

// <article class="maplisting">  
                
//                 <img class="logo" src="https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png" width="50px" height="50px">
//                 <h3>Where to find dilly bars</h3>
                
//                 <footer>
//                   <h4>@DanDangler</h4>
//                   <h4>Victoria</h4>
//                   <h4>Food</h4>
//                 </footer>
             
//           </article> 


 