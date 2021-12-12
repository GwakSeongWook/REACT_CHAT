import React from "react";
import "./Navbar.css";

const Navbar = function({roomName}){
  roomName = localStorage.getItem("roomName");
  if(localStorage.getItem("roomName") === "undefined"){
    roomName = "";
  }
  return (
    <nav className="navbar">
      <div className="logo">Chat</div>
    </nav>
  );
};

export default Navbar;