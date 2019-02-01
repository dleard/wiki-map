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


  let testMap =

  function createMapEntry(mapobject){
    //do biz
    const article = $('<article>').addClass("maplisting");
    
    const avatar = $('<img>').addClass("logo").attr('src', /*avatar src*/).appendTo(article);
    const h3 = $('<h3>').text(/*map name*/).appendTo(article);
    const footer = $('<footer>').appendTo(article);
    const h4_1 = $('<h4>').text(/*handle*/).appendTo(footer);
    const h4_2 = $('<h4>').text(/*city*/).appendTo(footer);
    const h4_3 = $('<h4>').text(/*category*/).appendTo(footer);
    // const report = $('<i>').addClass(`fas fa-flag`).addClass(`tweet-btn`).addClass(`report-btn`).appendTo(footer);
    // const retweet = $('<i>').addClass(`fas fa-retweet`).addClass(`tweet-btn`).addClass(`retweet-btn`).appendTo(footer);
    // const like = $('<i>').addClass(`fas fa-heart tweet-btn like-btn`).data( "liked", false ).appendTo(footer);
    // const likeCount = $('<h3>').text(tweet.likes).data("t-id", tweet.tuid).addClass(`like-count`).appendTo(footer);
    return article
  }

  //
  // RENDER IMPORT
  //

  function renderTweets(maps){
    maps.forEach(function(map){
      var $map = createMapEntry(map);

      // Test / driver code (temporary)
      $('.maplist-container').prepend($map);
    });   
  }

  //
  // RENDER IMPORT END
  //

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


