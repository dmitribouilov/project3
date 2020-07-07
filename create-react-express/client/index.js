const express = require("express");
const path = require("path");
var session = require("express-session");
// Requiring passport as we've configured it
var passport = require("./config/passport");

var db = require("./models");

//const PORT = process.env.PORT || 3001;
var app = express();

// Serve up static assets (usually on heroku)
//if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
//}

// Send every request to the React app
// Define any API routes before this runs

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);



app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});

app.get("/login", function(req, res) {
  // If the user already has an account send them to the members page
  if (req.user) {
    res.redirect("/members");
  }
  res.sendFile(path.join(__dirname, "../client/build/login.html"));
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});


const port = process.env.PORT || 5000;
db.sequelize.sync().then(function() {
  app.listen(port, function() {
    console.log("==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.", port, port);
  });
});


//app.listen(PORT, function() {
//  console.log(`🌎 ==> API server now on port ${PORT}!`);
//});



// Requiring necessary npm packages



// Setting up port and requiring models for syncing




// We need to use sessions to keep track of our user's login status




// Syncing our database and logging a message to the user upon success

