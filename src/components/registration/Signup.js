import React, { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { ref, set } from "firebase/database";
import Aspirant from "./Aspirant";
import "./assets/styles/Signup.css";
import { auth, db } from "../../FirebaseConfig";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/features/user/userSlice";

function Signup({ onSignedUp }) {
  const dispatch = useDispatch(); // Initialize the dispatch hook
  const [aspirant, setAspirant] = useState(false);
  const handleInputChange = (setValue, e) => setValue(e.target.value);

  // User data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [politicalParty, setPoliticalParty] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [age, setAge] = useState("18-30");
  const [isDisabled, setIsDisabled] = useState(true);
  const [userDataPayload, setUserDataPayload] = useState(""); // State for storing the user ID

  // Validation
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    if (password === passwordConfirmation) {
      setPasswordError(false);
      setIsDisabled(false);
    } else {
      setPasswordError(true);
      setIsDisabled(true);
    }
  }, [password, passwordConfirmation]);

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // Register user with Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Save user data to Firebase Realtime Database
      const userData = {
        fullname: name,
        email: email,
        politicalParty: politicalParty,
        age: age,
        aspirant: false, // This will be updated later
        accessToken: user.accessToken,
        userId: user.uid,
        location: {
          constituency: "",
          county: "",
          ward: "",
        },
        aspirancy: "none",
        phoneNumber: `${user.phoneNumber}` || "",
        profilePhotoURL: "",
        refreshToken: user.refreshToken,
        username: email.split("@")[0],
      };

      await set(ref(db, `users/${user.uid}`), userData);

      setUserDataPayload(userData);

      // Dispatch user data to Redux store
      dispatch(
        setUser({
          ...userData, // Dispatching the same data saved in Firebase
        })
      );

      setAspirant(true); // Proceed to Aspirant form
    } catch (error) {
      console.error("Error during registration:", error.message);
      alert(error.message); // Show alert for error handling
    }
  };

  return (
    <div className="signup">
      {aspirant ? (
        <Aspirant onJoinNow={onSignedUp} payload={userDataPayload} />
      ) : (
        <>
          <h2>Join the Platform</h2>
          <form>
            <input
              type="text"
              onChange={(e) => handleInputChange(setName, e)}
              placeholder="Full Name"
            />
            <input
              type="email"
              onChange={(e) => handleInputChange(setEmail, e)}
              placeholder="Email"
            />
            <input
              type="text"
              onChange={(e) => handleInputChange(setPoliticalParty, e)}
              placeholder="Political Party (optional)"
            />
            <input
              type="password"
              onChange={(e) => handleInputChange(setPassword, e)}
              placeholder="Password (min of 8 characters)"
            />
            <input
              type="password"
              onChange={(e) => handleInputChange(setPasswordConfirmation, e)}
              placeholder="Confirm Password"
              className={passwordError ? "passwordChecker" : ""}
            />

            {/* Age selection options */}
            <div className={"ageChoices"}>
              <span className={"custom_checkbox_cont"}>
                <label htmlFor="age1" className={"checkbox_cont"}>
                  <input
                    type="radio"
                    name="age-type"
                    className={"checkbox"}
                    value="18-30"
                    id="age1"
                    onChange={(e) => handleInputChange(setAge, e)}
                    defaultChecked
                  />
                  <span className={"custom_checkbox"}></span>
                </label>
                <span className={"checkbox_text"}>18 - 24 Years</span>
              </span>

              <span className={"custom_checkbox_cont"}>
                <label htmlFor="age2" className={"checkbox_cont"}>
                  <input
                    type="radio"
                    name="age-type"
                    className={"checkbox"}
                    value="31-40"
                    id="age2"
                    onChange={(e) => handleInputChange(setAge, e)}
                  />
                  <span className={"custom_checkbox"}></span>
                </label>
                <span className={"checkbox_text"}>25 - 30 Years</span>
              </span>

              <span className={"custom_checkbox_cont"}>
                <label htmlFor="age3" className={"checkbox_cont"}>
                  <input
                    type="radio"
                    name="age-type"
                    className={"checkbox"}
                    value="41-50"
                    onChange={(e) => handleInputChange(setAge, e)}
                    id="age3"
                  />
                  <span className={"custom_checkbox"}></span>
                </label>
                <span className={"checkbox_text"}>31 - 35 Years</span>
              </span>

              <span className={"custom_checkbox_cont"}>
                <label htmlFor="age4" className={"checkbox_cont"}>
                  <input
                    type="radio"
                    name="age-type"
                    className={"checkbox"}
                    value="50+"
                    onChange={(e) => handleInputChange(setAge, e)}
                    id="age4"
                  />
                  <span className={"custom_checkbox"}></span>
                </label>
                <span className={"checkbox_text"}>Above 35</span>
              </span>
            </div>
          </form>
          <button onClick={handleRegister} disabled={isDisabled}>
            Register
          </button>
        </>
      )}
    </div>
  );
}

export default Signup;
