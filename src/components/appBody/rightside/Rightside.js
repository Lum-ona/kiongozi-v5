import React, { useState, useLayoutEffect } from "react";
import "./assets/styles/Rightside.css";
import OtherLeaders from "./OtherLeaders";
import TwitterWidgets from "./TwitterWidgets";
import { useSelector } from "react-redux";
import { ref, onValue } from "firebase/database";
import { db } from "../../../FirebaseConfig";

function Rightside() {
  const [randomUsers, setRandomUsers] = useState([]);
  const user = useSelector((state) => state.user);
  const userId = user.userId ? user.userId : "";

  useLayoutEffect(() => {
    if (userId) {
      const randomUsersRef = ref(db, `users/followers/random`);

      onValue(
        randomUsersRef,
        (snapshot) => {
          const data = snapshot.val();
          if (data) {
            // Convert the object of users to an array
            const usersArray = Object.keys(data).map((key) => ({
              ...data[key],
              id: key,
            }));
            setRandomUsers(usersArray);
          }
        },
        {
          onlyOnce: true, // Fetch data only once
        }
      );
    }
  }, [userId]);

  return (
    <div className="rightside mt-5">
      <div className="top_other_leaders shadow">
        <h4>Other Leaders</h4>
        <div className="rightside_other_leaders">
          {randomUsers.map((user) => (
            <OtherLeaders key={user.id} userData={user} />
          ))}
        </div>
      </div>
      <div className="rightside_twitter_embed mt-5 shadow">
        <TwitterWidgets />
      </div>
    </div>
  );
}

export default Rightside;
