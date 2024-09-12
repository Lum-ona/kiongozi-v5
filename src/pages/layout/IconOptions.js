import React from "react";
import "./assets/styles/IconOptions.css";

function IconOptions({ Icon, text, color, onClick }) {
  return (
    <div onClick={onClick} className="iconOptions">
      {Icon && <Icon className="icons" style={{ color: color }} />}
      <p>{text}</p>
    </div>
  );
}

export default IconOptions;
