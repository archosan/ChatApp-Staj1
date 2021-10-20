import React, { useEffect, useState } from "react";
import "./sidebarchat.css";
import { Avatar } from "@material-ui/core";
import db from "../../firebase";
import { Link } from "react-router-dom";
function SidebarChat({ id, name, addNewChat, click }) {
  const [messages, setMessages] = useState([]);

  const createChat = () => {
    const roomName = prompt("Mesajlaşma odası için bir isim girin");
    if (roomName) {
      db.collection("rooms").add({
        name: roomName,
      });
    }
  };
  useEffect(() => {
    if (id) {
      db.collection("rooms")
        .doc(id)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [id]);
  return !addNewChat ? (
    <Link to={`/rooms/${id}`}>
      <div className="sidebarChat">
        <Avatar src="https://avatars.dicebar.com/api/human/a23.svg" />
        <div className="sidebarChat__info">
          <h2>{name}</h2>
          <p>{messages[0]?.message}</p>
        </div>
      </div>
    </Link>
  ) : (
    <div onClick={createChat} className="sidebarChat">
      <h2>Yeni Konuşma Ekle</h2>
    </div>
  );
}

export default SidebarChat;
