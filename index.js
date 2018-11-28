const express = require("express");
const app = express();
const path = require("path");
const socket = require("socket.io");
const { PORT } = require("./config/default.json");

// app.get("/", function(req, res) {
//   res.sendFile(path.join(__dirname + "/src/index.html"));
// });

app.use(express.static("src"));

const server = app.listen(PORT, () =>
  console.log(`server listening on port ${PORT}`)
);

const io = socket(server);

io.on("connection", socket => {
  console.log("Socket conection made successfully!!", socket.id);

  socket.on("chat_message", data => {
    io.sockets.emit("chat_message", data);
  });

  socket.on("typing", user => {
    socket.broadcast.emit("typing", user);
  });
});
