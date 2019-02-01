function saveData() {
  console.log("saving data!");
  var name = escape(document.getElementById('name').value);
  var address = escape(document.getElementById('address').value);
  var type = document.getElementById('type').value;
  var latlng = marker.getPosition();
  var url = 'phpsqlinfo_addrow.php?name=' + name + '&address=' + address +
            '&type=' + type + '&lat=' + latlng.lat() + '&lng=' + latlng.lng();

  downloadUrl(url, function(data, responseCode) {

    console.log(data);
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

$(() => {

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


