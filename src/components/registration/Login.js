import React, { useState } from "react";
import "./assets/styles/Login.css";
import googleIcon from "./assets/images/google.svg";
import { useDispatch, useSelector } from "react-redux";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Feedback from "../popup/Feedback";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { auth } from "../../FirebaseConfig";
import { setUser } from "../../redux/features/user/userSlice";
import { get, getDatabase, ref } from "firebase/database";

const MySwal = withReactContent(Swal);

function Login() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isLoggedIn);
  const [feedback] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Firebase login with email and password
  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      MySwal.fire({
        title: "Oops!",
        text: "Please enter your email and password",
        icon: "error",
      });
      return;
    }

    try {
      // Firebase sign-in with email and password
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log(user);
      fetchUserData(user.uid);

      MySwal.fire({
        title: "Success!",
        text: "Logged in successfully",
        icon: "success",
      });
    } catch (error) {
      if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        MySwal.fire({
          title: "Invalid Credentials",
          text: "Please check your email and password",
          icon: "error",
        });
      } else {
        MySwal.fire({
          title: "Error",
          text: error.message,
          icon: "error",
        });
      }
    }
  };

  // Firebase login with Google
  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      fetchUserData(user.uid);

      MySwal.fire({
        title: "Success!",
        text: "Logged in with Google",
        icon: "success",
      });
    } catch (error) {
      MySwal.fire({
        title: "Error",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Fetch user data from Firebase Realtime Database
  const fetchUserData = async (uid) => {
    const db = getDatabase(); // Get the database instance
    const userRef = ref(db, `users/${uid}`); // Reference to the user's data in the database
    try {
      const snapshot = await get(userRef); // Fetch data
      if (snapshot.exists()) {
        const userData = snapshot.val(); // Extract the user data

        // Dispatch the user data to Redux (optional)
        dispatch(setUser(userData));
      } else {
        console.log("No user data available");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const forgotPassHandler = () => {
    alert("Feature coming soon!");
  };

  return (
    <React.Fragment>
      {isLoggedIn ? null : (
        <div className="login">
          <h2>Welcome back</h2>
          <form>
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="Email"
              autoComplete="email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              autoComplete="current-password"
            />
            <span className="forgot-pass" onClick={forgotPassHandler}>
              Forgot Password?
            </span>
            <button
              onClick={(e) => handleLogin(e)}
              className="shadow"
              type="submit"
            >
              Login
            </button>
          </form>

          <span>or</span>

          <button
            className="google-button"
            type="button"
            onClick={handleGoogleLogin}
          >
            <img src={googleIcon} alt="" /> Login with Google
          </button>
        </div>
      )}
      {feedback && (
        <Feedback
          title="Error"
          message="Please fill all fields"
          onClick={handleLogin}
        />
      )}
    </React.Fragment>
  );
}

export default Login;
