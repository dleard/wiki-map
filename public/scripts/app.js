$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    for(let user of users) {
      console.log(user.name);
      // $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
