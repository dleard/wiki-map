const userid = 1;
const mapid = 1;


$(() => {
  /*
  
  // GET ALL USERS
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(let user of users) {
      console.log(user);
     // $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  // GET ALL MAPS
  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {
    for(let map of maps) {
      console.log(map);
     // $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  // GET ALL MAPS FROM 1 USER
  $.ajax({
    method: "GET",
    url: `/api/users/${userid}/maps`
  }).done((maps) => {
    for(let map of maps) {
      console.log(map);
     // $("<div>").text(user.name).appendTo($("body"));
    }
  });;
  
  // GET 1 USER BY ID
  $.ajax({
    method: "GET",
    url: `/api/users/${userid}`
  }).done((user) => {
      console.log(user);
    // $("<div>").text(user.name).appendTo($("body"));
  });;
  */

  // GET ALL MARKERS FOR 1 MAP
  $.ajax({
    method: "GET",
    url: `/api/maps/${mapid}`
  }).done((markers) => {
    for(let marker of markers) {
      console.log(marker);
    // $("<div>").text(user.name).appendTo($("body"));
    }
  });;

});
