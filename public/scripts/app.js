$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(let user of users) {
      console.log(`USER:   NAME: ${user.name} TYPE: ${user.type}`);
      // $("<div>").text(user.name).appendTo($("body"));
    }
  });;

  $.ajax({
    method: "GET",
    url: "/api/maps"
  }).done((maps) => {
    for(let map of maps) {
      console.log(`MAP:   NAME: ${map.name} CITY: ${map.city}`);
      // $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
