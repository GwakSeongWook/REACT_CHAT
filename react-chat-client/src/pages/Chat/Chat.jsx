import React, { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import ChatInput from "../../components/ChatInput/ChatInput";
import ChatLog from "../../components/ChatLog/ChatLog";
import Navbar from "../../components/Navbar/Navbar"
import Loading from "./Loading";
import "./Chat.css"

const Chat = function({ roomName, userName }){
  const myInfo = {
    roomName: roomName ? roomName : localStorage.getItem("roomName"),
    userName: userName ? userName : localStorage.getItem("userName"),
  };
  const [currentSocket, setCurrentSocket] = useState();

  useEffect(function(){
    setCurrentSocket(socketIOClient("localhost:5000"));
  }, []);

  if (currentSocket) {
    currentSocket.on("connect", function(){
      currentSocket.emit("join", myInfo);
    });
  }

  return (
    <div>
      <Navbar></Navbar>
      {currentSocket ? (
        <div className="container">
          <ChatLog socket={currentSocket}></ChatLog>
          <ChatInput userName={userName} socket={currentSocket}></ChatInput>
        </div>
      ) : (
        <Loading></Loading>
      )}
    </div>
  );
};

export default Chat;
