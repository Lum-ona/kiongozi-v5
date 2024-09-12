import React from "react";
import "./assets/styles/Feedback.css";

function Feedback({ title, message, onClick }) {
  return (
    <div className="feedback">
      <h5>{title}</h5>
      <p>{message}</p>
      <button className="feedback-btn" onClick={onClick}>
        Okay
      </button>
    </div>
  );
}

export default Feedback;
