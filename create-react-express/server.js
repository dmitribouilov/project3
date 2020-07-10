const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();

//for chatapp
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server);

io.on("connection", socket => {
  socket.emit("your id", socket.id);
  socket.on("send message", body => {
      io.emit("message", body)
  })
})
//done

// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Send every request to the React app
// Define any API routes before this runs

app.get('/api/getList', (req,res) => {
  var list = ["item1", "item2", "item3"];
  res.json(list);
  console.log('Sent list of items');
});


app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(PORT, function() {
  console.log(`🌎 ==> API server now on port ${PORT}!`);
});
