import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import Navbar from "../../components/Navbar/Navbar"

const Home = function(){
  // 닉네임 설정
  const [userName, setUserName] = useState("");
  const [userList, setUserList] = useState([
    {
      id: 1,
      userName: 'usertest1'
    },
    {
      id: 2,
      userName: 'usertest2'
    },
    {
      id: 3,
      userName: 'usertest3'
    },
  ]);

  const onChangeUser = function(e){
    setUserName(e.target.value);
  };

  // 방이름 설정
  const [roomName, setRoomName] = useState("");
  const [roomList, setRoomList] = useState([
    {
      id: 1,
      roomName: 'roomtest1'
    },
    {
      id: 2,
      roomName: 'roomtest2'
    },
    {
      id: 3,
      roomName: 'roomtest3'
    }
  ]);

  const onChangeRoom = function(e){
    setRoomName(e.target.value);
  };

  const onClick = function(e){
    const newListUser = userList.concat(userName);
    setUserList(newListUser);
    setUserName("");
    localStorage.setItem("userName", userName);

    const newListRoom = roomList.concat(roomName);
    setRoomList(newListRoom);
    setRoomName("");
    localStorage.setItem("roomName", roomName);
  }
  
  return (
    <div>
      <Navbar></Navbar>
      <form className="card">
        <label className="cardLabel" htmlFor="roomName">Room</label>
        <input className="cardInput" name="roomName" onChange={onChangeRoom} autoComplete="off" placeholder="방이름" value={roomName}></input>
        <label className="cardLabel" htmlFor="userName">Name</label>
        <input className="cardInput" name="userName" onChange={onChangeUser} autoComplete="off" placeholder="닉네임" value={userName}></input>
        <button className="JoinButton" onClick={onClick}>
          <Link className="textDecoN" to="/Chat" >join</Link>
        </button>
      </form>
      <div className="listCard">
        <div className="listName">방 목록</div>
        <div classNane="listForm">
          {roomList.map((room) => 
            <p className="list">{room.roomName}</p>
          )}
        </div>
      </div>      
    </div>
  );
};

export default Home;
