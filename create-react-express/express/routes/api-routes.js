// Requiring our models and passport as we've configured it
var db = require("../models");
var passport = require("../config/passport");

var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'dmitrisnodemailer2@gmail.com',
    pass: '%6uD/"ZbwdRA{m__'
  }
});

module.exports = function(app) {
  // Using the passport.authenticate middleware with our local strategy.
  // If the user has valid login credentials, send them to the members page.
  // Otherwise the user will be sent an error
  app.post("/api/login", passport.authenticate("local"), function(req, res) {
    
    res.json(req.user);
  });

  // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
  // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
  // otherwise send back an error

  app.put("/api/logoff", function(req, res) {

        console.log("the email is ", req.body.email)
    db.User.update(
        { onlineStatus: 'offline' },
        { where: { email: req.body.email } }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.put("/api/loginupdate", function(req, res) {

        
    db.User.update(
        { onlineStatus: 'online' },
        { where: { email: req.body.email } }
      )
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });


  app.get("/api/getOnline", function(req, res) {
    db.User.findAll({
      where: {
        onlineStatus: "online"
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/getUser/:user", function(req, res) {
    db.User.findAll({
      where: {
        email: req.params.user
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/getUsers", function(req, res) {
    db.User.findAll({
      
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });

  app.get("/api/getOffline", function(req, res) {
    db.User.findAll({
      where: {
        onlineStatus: "offline"
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  });





  app.post("/api/signup", function(req, res) {
    db.User.create({
      playerName: req.body.playerName,
      email: req.body.email,
      password: req.body.password,
      onlineStatus: "online"
    }).then(function(dbsaveAccount) {
      //console.log(dbsaveAccount.dataValues.email)
      var mailOptions = {
        from: 'dmitrisnodemailer2@gmail.com',
        to: dbsaveAccount.dataValues.email,
        subject: `Let PLAY, you are REGISTERED  !!!`,
        text: `You are going to have so much fun!`
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
     })
      .then(function() {
        res.redirect(307, "/api/login");
      })
      .catch(function(err) {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });

  // Route for getting some data about our user to be used client side
  app.get("/api/user_data", function(req, res) {
    if (!req.user) {
      // The user is not logged in, send back an empty object
      res.json({});
    } else {
      // Otherwise send back the user's email and id
      // Sending back a password, even a hashed password, isn't a good idea
      res.json({
        email: req.user.email,
        id: req.user.id
      });
    }
  });
};
