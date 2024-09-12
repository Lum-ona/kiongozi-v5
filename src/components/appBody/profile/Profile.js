import React, { useState, useEffect } from "react";
import "./assets/styles/profile.css";
import animalPic1 from "./assets/images/rhino.jpg";
import { Link } from "react-router-dom";
import Manifesto from "./Manifesto";
import Bio from "./Bio";
import { useSelector } from "react-redux";
import { ref as dbRef, get } from "firebase/database"; // Firebase Realtime Database methods
import { ref as storageRef, getDownloadURL } from "firebase/storage"; // Firebase Storage methods
import { doc, getDoc, updateDoc } from "firebase/firestore"; // Firebase Firestore methods
import { auth, db, storage } from "../../../FirebaseConfig";

const Profile = () => {
  const [view, setView] = useState("manifesto");
  const [userData, setUserData] = useState({});
  const user = useSelector((state) => state.user); // Get logged-in user from Redux

  useEffect(() => {
    // Fetch user data from Firebase
    const fetchUserData = async () => {
      try {
        // Fetch user profile data from Firebase Realtime Database
        const userRef = dbRef(db, `users/${auth.currentUser.uid}`);
        const userSnap = await get(userRef);
        if (userSnap.exists()) {
          const data = userSnap.val();

          // Fetch user profile picture URL from Firebase Storage
          if (data.profilePhotoPath) {
            const profilePhotoURL = await getDownloadURL(
              storageRef(storage, data.profilePhotoPath)
            );
            data.profilePhotoURL = profilePhotoURL;
          }

          setUserData(data); // Set the fetched user data to state
        } else {
          console.log("User not found");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData(); // Trigger the fetch
  }, []); // Re-run effect when `id` changes

  const changeView = (newView) => {
    setView(newView);
  };

  const followUser = async (e) => {
    e.preventDefault();
    try {
      // Update the follower data in Firestore
      const userDocRef = doc(db, "users", user.userId);
      const followingDocRef = doc(db, "users", auth.currentUser.uid);

      const userDoc = await getDoc(userDocRef);
      const followingDoc = await getDoc(followingDocRef);

      if (userDoc.exists() && followingDoc.exists()) {
        // Add follower to the following user's list
        const updatedFollowing = [
          ...(userDoc.data().following || []),
          auth.currentUser.uid,
        ];
        await updateDoc(userDocRef, { following: updatedFollowing });

        // Add current user to the followed user's followers list
        const updatedFollowers = [
          ...(followingDoc.data().followers || []),
          user.userId,
        ];
        await updateDoc(followingDocRef, { followers: updatedFollowers });

        console.log("Followed successfully");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  return (
    <div className="container profile_cont">
      <div className="profile_image_cont shadow mt-3">
        <div className="banner_image">
          <img src={animalPic1} alt="Banner" />
        </div>
        <span>
          <div className="profile_pic">
            <img
              src={userData.profilePhotoURL || animalPic1}
              alt="Profile Pic"
            />
          </div>
          <div className="profile_info">
            <div className="profile_handle_info">
              <div className="profile_name">{userData.name}</div>
              <div className="profile_username">@{userData.username}</div>
            </div>
            <div className="profile_activity_info">
              <span>
                <span className="profile_activity_figures">0</span>
                <span className="profile_activity_category">Posts</span>
              </span>
              <span>
                <span className="profile_activity_figures">
                  {userData.followers?.length || 0}
                </span>
                <span className="profile_activity_category">Followers</span>
              </span>
              <span>
                <span className="profile_activity_figures">
                  {userData.following?.length || 0}
                </span>
                <span className="profile_activity_category">Following</span>
              </span>
            </div>
          </div>

          <div className="profile_btn_cont">
            {/* Conditional render for Follow/Edit Profile button */}
            {user.userId === userData.userId ? (
              <Link to={`/profile/edit/${user.userId}`}>
                <button type="button" className="edit_profile_btn">
                  Edit Profile
                </button>
              </Link>
            ) : (
              <button
                onClick={(e) => followUser(e)}
                type="button"
                className="edit_profile_btn"
              >
                Follow
              </button>
            )}
          </div>
        </span>

        <div className="nav_links_cont">
          <button
            onClick={() => changeView("manifesto")}
            type="button"
            className={view === "manifesto" ? "active_tab" : ""}
          >
            Manifesto
          </button>
          <button
            onClick={() => changeView("bio")}
            type="button"
            className={view === "bio" ? "active_tab" : ""}
          >
            Bio
          </button>
        </div>
      </div>

      <div className="view_cont shadow mt-3">
        {view === "manifesto" && (
          <Manifesto
            manifestoData={userData}
            showEditManifesto={user.userId === userData.userId}
          />
        )}
        {view === "bio" && <Bio data={userData} />}
      </div>
    </div>
  );
};

export default Profile;
