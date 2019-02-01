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
  const editMarker = {address: '1q234 sucks', name: 'bad place'}
  $.ajax({
    method: "PUT",
    url: `/api/markers/${markerid}`,
    data: editMarker
  }).done(() => {
    console.log(`${editMarker} changed`);
    // $("<div>").text(user.name).appendTo($("body"));
  });;
  
  // ADD A NEW MARKER
  const newMarker = {id: 6, name: 'booger palace', address: '123 yuck', lat: 48, long: -123, type: 'custom', contributorid: 2, mapid: 1};
  $.ajax({
    method: "POST",
    url: '/api/markers',
    data: newMarker
  }).done (() => {
    console.log(`Marker with name: ${newMarker.name} added`);
    // $("<div>").text(user.name).appendTo($("body"));
  });
  
  // DELETE A MARKER
  const deleteMarker = 6;
  $.ajax({
    method: "DELETE",
    url: `/api/markers/${deleteMarker}`
  }).done (() => {
    console.log(`Marker with id ${deleteMarker} removed`);
    // $("<div>").text(user.name).appendTo($("body"));
  });

  // ADD NEW MAP
  const newMap = {id: 9, name: "new map", startlat: 48, startlong: -123, type: "food", likes: 0, creatorid: 1};
  $.ajax({
    method: "POST",
    url: '/api/maps',
    data: newMap
  }).done (() => {
    console.log(`new map with name: ${newMap.name} added`);
  });
  */
});
