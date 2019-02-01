$(() => {
  $.ajax({
    method: "GET",
    url: "/api/users"
  }).done((users) => {
    console.log(users);
    for(let user of users) {
      console.log(user);
     // $("<div>").text(user.name).appendTo($("body"));
    }
  });;
});
