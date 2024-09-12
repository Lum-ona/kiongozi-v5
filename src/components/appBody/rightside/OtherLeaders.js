import React from "react";
import { Avatar } from "@mui/material";
import PersonAddOutlinedIcon from "@mui/icons-material/PersonAddOutlined";
import "./assets/styles/OtherLeaders.css";

function OtherLeaders({ userData }) {
  return (
    <div className="other_leaders mt-2 rounded-pill shadow-sm py-2 justify-content-around align-self-center">
      { userData.profilePhotoURL ? <Avatar src={userData.profilePhotoURL}/> : <Avatar />}
      <p>{userData.username}</p>
      <PersonAddOutlinedIcon />
    </div>
  );
}

export default OtherLeaders;
