import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./assets/styles/Header.css";
import { LoginPopup, RegisterPopup } from "../registration/SignInPopup";
import { Avatar } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { clearUser } from "../../redux/features/user/userSlice";
import { auth } from "../../FirebaseConfig";

function LoginOptionsButtons({ showLogin, showRegister }) {
  return (
    <div className="guest_buttons">
      <button className="join_btn" type="button" onClick={showRegister}>
        Join Platform
      </button>
      <button className="login_btn" type="button" onClick={showLogin}>
        Login
      </button>
    </div>
  );
}

function Header() {
  const loggedIn = useSelector((state) => state.user.isLoggedIn);
  const photoUrl = useSelector((state) => state.user.profilePhotoURL);

  const [loginComponentShow, setLoginComponentShow] = useState(false);
  const [registerComponentShow, setRegisterComponentShow] = useState(false);

  const [profileMenu, setProfileMenu] = useState(false);

  const dispatch = useDispatch();
  const showProfileMenu = () => {
    if (profileMenu === false) {
      setProfileMenu(true);
    } else {
      setProfileMenu(false);
    }
  };

  const showLoginPopup = () => {
    setLoginComponentShow(true);
    setRegisterComponentShow(false);
  };

  const closeLoginPopup = () => {
    setLoginComponentShow(false);
  };

  const showRegisterPopup = () => {
    setRegisterComponentShow(true);
    setLoginComponentShow(false);
  };

  const closeRegisterPopup = () => {
    setRegisterComponentShow(false);
  };

  return (
    <div>
      <div className="header shadow ">
        <div className="header_search_mobile">
          <span>
            <SearchIcon
              style={{ color: "rgba(0, 0, 0, 0.35)", fontSize: 26 }}
            />
          </span>
        </div>

        <div className="header_left">
          <Link to="/">
            <h1>KIONGOZI</h1>
          </Link>

          <div className="header_search">
            <form>
              <input placeholder="Search" type="text" />
              <button style={{ display: "none" }} type="submit">
                search
              </button>
            </form>
          </div>
        </div>

        {loggedIn ? (
          <nav>
            <div className="navlink">
              <Link to="/">
                <HomeIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
                Home
              </Link>

              <Link to="/explore">
                <MenuBookIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
                Explore
              </Link>
              {/* <Link to="#">
                <NotificationsIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
                Notification
              </Link> */}
            </div>
            <div className="profile_link">
              <span onClick={showProfileMenu}>
                <Avatar
                  src={photoUrl}
                  style={{ color: "rgba(0, 0, 0, 0.35)", fontSize: 40 }}
                />
              </span>
              {profileMenu && (
                <div className="profileMenu shadow-lg">
                  <Link
                    className="profile-options"
                    style={{
                      textDecoration: "none",
                      color: "rgba(0, 0, 0, 0.45)",
                    }}
                    to={`/profile/${auth.currentUser.uid}`}
                  >
                    Profile
                  </Link>
                  <hr />
                  <Link
                    className="profile-options"
                    style={{
                      textDecoration: "none",
                      color: "rgba(0, 0, 0, 0.45)",
                    }}
                    to={`/about`}
                  >
                    About
                  </Link>
                  <hr />
                  <p
                    className="profile-options"
                    onClick={() => dispatch(clearUser())}
                  >
                    Log Out
                  </p>
                </div>
              )}
            </div>
          </nav>
        ) : (
          <nav>
            <div className="login_options_cont_topbar">
              <LoginOptionsButtons
                showLogin={showLoginPopup}
                showRegister={showRegisterPopup}
              />
            </div>
          </nav>
        )}
      </div>

      {loginComponentShow ? <LoginPopup closePopup={closeLoginPopup} /> : ""}
      {registerComponentShow ? (
        <RegisterPopup closePopup={closeRegisterPopup} />
      ) : (
        ""
      )}

      <div className="bottom_navbar">
        {loggedIn ? (
          <div className="navlink">
            <Link to="/">
              <span>
                <HomeIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
              </span>
            </Link>
            <Link to="/explore">
              <span>
                <MenuBookIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
              </span>
            </Link>
            <Link to="#">
              <span>
                <NotificationsIcon
                  className="nav_icon"
                  style={{ color: "rgba(0, 0, 0, 0.45)", fontSize: 27 }}
                />
              </span>
            </Link>
          </div>
        ) : (
          <div className="login_options_cont_bottombar">
            <LoginOptionsButtons
              showLogin={showLoginPopup}
              showRegister={showRegisterPopup}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
