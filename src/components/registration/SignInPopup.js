import React from "react";
import "./assets/styles/Popup.css";
import Login from "./Login";
import Signup from "./Signup";
import { useSelector } from "react-redux";
import "./assets/styles/SignupPopup.css";

function LoginPopup({ closePopup }) {
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  return (
    <React.Fragment>
      {isLoggedIn ? null : (
        <div className="popup-cont">
          <div className="popup-innercont">
            <span onClick={closePopup}>&times;</span>
            <Login />
          </div>
        </div>
      )}
    </React.Fragment>
  );
}

function RegisterPopup({ closePopup }) {
  return (
    <div className="popup-cont">
      <div className="popup-innercont">
        <span onClick={closePopup}>&times;</span>
        <Signup onSignedUp={closePopup} />
      </div>
    </div>
  );
}

export { LoginPopup, RegisterPopup };
