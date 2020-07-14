


# War Drinking Card Game 

# Synopsis
This is a war drinking card app for two players to play against each other and the loser is prompted to drink a random drink. The game also has a chat element, where the two players can chat with each other. The app uses ReactJS, Node and Express, MongoDB and is also deployed in Heroku. 

The project also uses Socket.io for the two-way chat functionality and Passport for user authentication. 

# User Story

AS A game player looking for a fun party game online,
I WANT a fun card game 
SO THAT I can play with a friend during our online parties 

# Screenshots 
![wargame-flow](https://user-images.githubusercontent.com/56641651/87484261-bb6e7000-c603-11ea-95a8-04d776fabc9b.jpeg)

User Flow 

<img width="1440" alt="Screen Shot 2020-07-11 at 10 16 47 AM" src="https://user-images.githubusercontent.com/56641651/87484421-156f3580-c604-11ea-8b96-d47e02837092.png">



# Acceptance Criteria 
The project fulfills the below acceptance criteria: 

* Must use ReactJS
* Must use a Node and Express Web Server 
* Must be backend by a MongoDB Database with a Sequalize or Mongoose ORM 
* Must have both GET and POST routes for retrieving and adding new data 
* Must be deployed using Heroku (with Data)
* Must utilize at least two libraries, packages, or technologies that we haven’t discussed 
* Must allow for or involve the authentication of users in some way
* Must have a polished frontend/UI
* Must have folder structure that meets MVC Paradigm 
* Must meet good quality coding standards (identation, scoping, naming)
* Must not expose sensitive API key information on the server 

# Sample Code

```
var db = require("../models");

// Telling passport we want to use a Local Strategy. In other words, we want login with a username/email and password
passport.use(new LocalStrategy(
 // Our user will sign in using an email, rather than a "username"
 {
   usernameField: "email"
 },
 function(email, password, done) {
   // When a user tries to sign in this code runs
   db.User.findOne({
     where: {
       email: email
     }
   }).then(function(dbUser) {
     // If there's no user with the given email
     if (!dbUser) {
       return done(null, false, {
         message: "Incorrect email."
       });
     }
     // If there is a user with the given email, but the password the user gives us is incorrect
     else if (!dbUser.validPassword(password)) {
       return done(null, false, {
         message: "Incorrect password."


```


  
 # Installation
To use this portfolio, log into your GitHub account (if you don’t have a GitHub user profile, create one at https://github.com/join) and open this link in your browser: https://github.com/dmitribouilov/project3. Then click on the "Fork" button at the top right corner and wait until the repo is forked. 




