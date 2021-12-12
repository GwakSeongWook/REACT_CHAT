const express = require("express");
const http = require("http");
const socketIO = require("socket.io");
const cors = require("cors");
const { timeLog } = require("console");
const port = 5000;
const app = express();

app.use(cors());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
    allowedHeaders: ["*"],
    credentials: true,
  },
});

io.on("connection", function(socket){
  // join : 채팅 참여 이벤트
  socket.on("join", function({ roomName: room, userName: user }){
    socket.join(room);
    io.to(room).emit("onConnect", `${user} 님이 입장했습니다.`);
    socket.on("onSend", function(messageItem){
      io.to(room).emit("onReceive", messageItem);
    });
1
    socket.on("disconnect", function(){
      socket.leave(room);
      io.to(room).emit("onDisconnect", `${user} 님이 퇴장하셨습니다.`);
    });
  });
});

server.listen(port, function(){
  console.log(`Listening on port ${port}`)
});
