const userid = 1;
const mapid = 1;
const markerid = 1;


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

  // GET 1 MARKER
  $.ajax({
    method: "GET",
    url: `/api/markers/${markerid}`
  }).done((marker) => {
      console.log(marker);
    // $("<div>").text(user.name).appendTo($("body"));
  });;

  // EDIT A MARKER
  const editMarker = {address: '1234 sucks', name: 'bad place'}
  $.ajax({
    method: "PUT",
    url: `/api/markers/${markerid}`,
    data: editMarker
  }).done((marker) => {
    console.log(marker);
    // $("<div>").text(user.name).appendTo($("body"));
  });;
  
  const newMarker = {id: 6, name: 'booger palace', address: '123 yuck', lat: 48, long: -123, type: 'custom', contributorid: 2, mapid: 1};

  $.ajax({
    method: "POST",
    url: '/api/markers',
    data: newMarker
  }).done ((marker) => {
    console.log(marker);
    // $("<div>").text(user.name).appendTo($("body"));
  });
  */
});

