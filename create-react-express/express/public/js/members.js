$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  var currentUser="";
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
    currentUser=data.email
  });

  getDevouredBurgers();
getUndevouredBurgers();


$('#logout').on('click', function(event){


 

  $.ajax({
    method: "PUT",
    url: "/api/logoff",
    data: {email: currentUser}
  })
    .then(function() {

   location.replace("/logout")
    console.log("done")
    })})



function getDevouredBurgers() {
  
    $.get("/api/getOnline", function(data) {
      console.log("Burgers", data);
      for (let index = 0; index < data.length; index++) {
        $("#online").append(`
        
    <li class="list-group-item"><h3>${data[index].email}</h3></li>
    
`);


    } 
      
    
      
    });
  }






function getUndevouredBurgers() {
  
    $.get("/api/getOffline", function(data) {
      console.log("Burgers", data);
      for (let index = 0; index < data.length; index++) {
        $("#offline").append(`<li class="list-group-item"><h3>${data[index].email}</h3> </li>`);
       } 
      });
  }

  $('#undevoured').on('click', 'button', function(event){


        $.ajax({
          method: "PUT",
          url: "/api/devourBurger/"+event.target.id,
          data: ""
        })
          .then(function() {

         location.reload()
          console.log("done")
          });
      
}
    
    
    
    
    
    
    )










$("#addBurger").on("click", function (e) {
    e.preventDefault();
    var newBurgerSave={

      burger_status: "ready",
      burger_name: $("#burger").val().trim()

    }

     $.post("/api/saveBurger", newBurgerSave,
  function(data) {

   
    if (data) {
      //alert("Thank you, Burger Submitted!");
      location.reload()

    }

    
    else {
      alert("Something went wrong ...");
     
    }
  });



});


});
