import React, { useState } from "react";
import "./ChatInput.css";

const ChatInput = function({ userName, socket }){
  const [chatMessage, setChatMessage] = useState("");

  const handleSubmit = function(e){
    e.preventDefault();
    socket.emit("onSend", {
      userName: userName ? userName : localStorage.getItem("userName"),
      msg: chatMessage,
      timeStamp: new Date().toLocaleTimeString(),
    });
    setChatMessage("");
  };

  const onChatMessageChange = function(e){
    setChatMessage(e.target.value);
  };

  return (
    <div className="inputContainer">
      <form className="inputForm" onSubmit={handleSubmit}>
        <input
          placeholder="메시지를 입력하세요."
          value={chatMessage}
          onChange={onChatMessageChange}
        ></input>
        <button><img className="send" src="/send.png" alt="send"/></button>
      </form>
    </div>
  );
};

export default ChatInput;
