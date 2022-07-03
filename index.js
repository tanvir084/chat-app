const express = require('express');
const app = express();

const http = require('http');
const expressServer = http.createServer(app);

const { Server } = require('socket.io');
const io = new Server(expressServer);

io.on('connection', (socket)=> {
  console.log("New user connected");

  socket.on('chat', function(msg) {
    console.log(msg);
    io.emit('chatTransfer', msg);
  });

  socket.on('disconnect', function(){
    console.log("User disconnected");
  });
});

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

expressServer.listen(4000, function() {
  console.log("Server run @ 4000");
});
