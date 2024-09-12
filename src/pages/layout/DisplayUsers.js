import React from "react";
import DisplayUsersBucket from "./DisplayUsersBucket";

import "./assets/styles/DisplayUsers.css";
function DisplayUsers() {
  return (
    <div className="displayUsers">
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
      <DisplayUsersBucket />
    </div>
  );
}

export default DisplayUsers;
