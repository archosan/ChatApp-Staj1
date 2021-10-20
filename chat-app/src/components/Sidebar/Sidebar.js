import React, { useState, useEffect } from "react";
import "./sidebar.css";
import SidebarChat from "../SidebarChat/SidebarChat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import ChatIcon from "@material-ui/icons/Chat";
import AvatarIcon from "@material-ui/core/Avatar/Avatar";
import SearchOutlinedIcon from "@material-ui/icons/SearchOutlined";
import db from "../../firebase";
import { useStateValue } from "../../StateProvider";

function Sidebar() {
  const [rooms, setRooms] = useState([]);
  const [{ user }] = useStateValue();
  useEffect(() => {
    db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <AvatarIcon src={user?.photoURL} />
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon className="sidebar__headerRightIcon" />
          </IconButton>
          <IconButton>
            <ChatIcon className="sidebar__headerRightIcon" />
          </IconButton>
          <IconButton>
            <MoreVertIcon className="sidebar__headerRightIcon" />
          </IconButton>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchOutlinedIcon />
          <input type="text" placeholder="Ara ya da yeni bir yazışma başlat" />
        </div>
      </div>
      <SidebarChat addNewChat />
      <div className="sidebar__chats">
        {rooms.map((room) => (
          <SidebarChat click key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
