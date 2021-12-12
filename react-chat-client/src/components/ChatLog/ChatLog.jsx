import React, { useEffect, useState } from "react";
import "./ChatLog.css"

const ChatLog = function({ socket }){
  const [msgList, setMsgList] = useState([]);

  useEffect(function(){
    socket.on("onReceive", function(messageItem){
      setMsgList((msgList) => [...msgList, messageItem]);
    });
    socket.on("onConnect", function(systemMessage){
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    socket.on("onDisconnect", function(systemMessage){
      setMsgList((msgList) => [...msgList, { msg: systemMessage }]);
    });
    return () => {
      socket.disconnect();
    };
  }, [socket]);

  return (
    <div className="logContainer">
      {msgList.map((msg, idx) => (
        <div className="logCard" key={idx}>
          <div className="userInfo">
            <div>{msg.userName}</div>
            <div>{msg.timeStamp}</div>
          </div>
          <div className="msg">{msg.msg}</div>
        </div>
      ))}
    </div>
  );
};

export default ChatLog;