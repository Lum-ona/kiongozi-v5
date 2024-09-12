import React from "react";
import "./assets/styles/DisplayUsersBucket.css";
import { Avatar } from "@mui/material";

import "./assets/styles/DisplayUsersBucket.css";
function DisplayUsersBucket() {
  return (
    <div className="displayUsersBucket shadow">
      <Avatar />
      <h5 className="usernames text-center">Another Username</h5>
      <p className="aspirant">Aspirancy</p>
      <p className="countyname">county</p>
      <button className="bttn shadow">Follow</button>
    </div>
  );
}

export default DisplayUsersBucket;
