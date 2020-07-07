console.log("can i get a haaaaw yeeeea? ");


getDevouredBurgers();
getUndevouredBurgers();


function getDevouredBurgers() {
  
    $.get("/api/getDevoured", function(data) {
      console.log("Burgers", data);
      for (let index = 0; index < data.length; index++) {
        $("#devoured").append(`
        
    <li class="list-group-item"><h3>${data[index].burger_name}</h3></li>
    
`);


    } 
      
    
      
    });
  }






function getUndevouredBurgers() {
  
    $.get("/api/getUndevoured", function(data) {
      console.log("Burgers", data);
      for (let index = 0; index < data.length; index++) {
        $("#undevoured").append(`<li class="list-group-item"><h3>${data[index].burger_name}</h3> <button type="submit" id="${data[index].id}" class="btn btn-success submit btn-lg devour">DEVOUR IT !</button></li>`);
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