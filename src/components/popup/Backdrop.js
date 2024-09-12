import React from "react";

import "./assets/styles/Backdrop.css";

function Backdrop({ onClick }) {
  return (
    <div className="backdrop" onClick={onClick}>
      {" "}
      backdrop
    </div>
  );
}

export default Backdrop;
