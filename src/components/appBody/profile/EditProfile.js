import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./assets/styles/profile.css";
import "./assets/styles/editProfile.css";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import {
  counties,
  constituencies,
  wards,
} from "../../registration/utils/location/locationData";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
// import { handleFileUpload } from "../../../utils/fileUploader";
import {
  updateProfile as firebaseUpdateProfile,
  updateEmail,
  updatePassword,
} from "firebase/auth";

import { auth, db, storage } from "../../../FirebaseConfig";
import {
  getDownloadURL,
  ref as refStorage,
  uploadBytes,
} from "firebase/storage";
import { set, ref as dbRef } from "firebase/database";
import { setUser } from "../../../redux/features/user/userSlice";

const MySwal = withReactContent(Swal);

const EditProfile = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [fullname, setFullName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [username, setUsername] = useState(user.username);
  const [politicalParty, setPoliticalParty] = useState(user.politicalParty);
  const [age, setAge] = useState(user.ageGroup);
  const [aspirancy, setAspirancy] = useState(user.aspirancy);

  const [county, setCounty] = useState(user.county);
  const [constituency, setConstituency] = useState(user.constituency);
  const [ward, setWard] = useState(user.ward);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [profileImage, setProfileImage] = useState(null);
  const [profileImageURL, setProfileImageURL] = useState(user.profilePhotoURL);

  const [bannerImage, setBannerImage] = useState(null);
  const [bannerImageURL, setBannerImageURL] = useState(user.bannerPhotoURL);

  const [countyDataArr, setCountyData] = useState(counties);
  const [constituencyDataArr, setConstituencyData] = useState(constituencies);
  const [wardDataArr, setWardData] = useState(wards);

  counties.sort((countyA, countyB) => countyA.name.localeCompare(countyB.name));

  const capitalizeNamesInArr = (arr) => {
    let newArr = [];
    arr.forEach((el) => {
      const elName = el.name;
      const newName = elName.charAt(0).toUpperCase() + elName.slice(1);
      el.name = newName;
      newArr.push(el);
    });
    return newArr;
  };

  capitalizeNamesInArr(counties);
  const findCountyName = (countyId) => {
    const foundCounty = countyDataArr.find((data) => data.id === countyId);
    setCounty(foundCounty.name);
  };

  const findConstituenciesInCounty = (countyId) => {
    const constituenciesFound = constituencies.filter(
      (data) => data.countyId === countyId
    );
    setConstituencyData(constituenciesFound);
  };

  const findConstituencyName = (constituencyId) => {
    const foundConstituency = constituencyDataArr.find(
      (data) => data.id === constituencyId
    );
    setConstituency(foundConstituency.name);
  };

  const findWardsInCounty = (countyId) => {
    const wardsFound = wards.filter((data) => data.countyId === countyId);
    setWardData(wardsFound);
  };

  const findWardsInConstituency = (constituencyId) => {
    const wardsFound = wards.filter(
      (data) => data.constituencyId === constituencyId
    );
    setWardData(wardsFound);
  };

  const findWardName = (wardId) => {
    const foundWard = wardDataArr.find((data) => data.id === wardId);
    setWard(foundWard.name);
  };

  const handleCountyChange = (e) => {
    const countyId = e.target.value;
    findCountyName(countyId);
    setCountyData(counties);
    findConstituenciesInCounty(countyId);
    findWardsInCounty(countyId);
  };

  const handleConstituencyChange = (e) => {
    const constituencyId = e.target.value;
    findConstituencyName(constituencyId);
    findWardsInConstituency(constituencyId);
  };

  const handleWardChange = (e) => {
    const wardId = e.target.value;
    findWardName(wardId);
  };

  // Handling image input changes
  const handleImageInputChange = (e, setImage, setImageURL) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);

      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  // Upload file to Firebase Storage and return the download URL
  const uploadImageToStorage = async (file, folder) => {
    const storageRef = refStorage(storage, `${folder}/${file.name}`);
    await uploadBytes(storageRef, file);
    return getDownloadURL(storageRef);
  };

  // Handle profile update
  const handleUpdateProfile = async () => {
    if (!auth.currentUser) {
      MySwal.fire({
        title: "Not logged in",
        icon: "error",
      });
      return;
    }

    let profileImgURL = profileImageURL;
    let bannerImgURL = bannerImageURL;

    // Upload profile and banner images if they exist
    if (profileImage) {
      profileImgURL = await uploadImageToStorage(profileImage, "profileImages");
    }
    if (bannerImage) {
      bannerImgURL = await uploadImageToStorage(bannerImage, "bannerImages");
    }

    const updatedUserData = {
      fullname,
      email,
      politicalParty,
      profilePhotoURL: profileImgURL,
      bannerPhotoURL: bannerImgURL,
      aspirancy,
      ageGroup: age,
      location: {
        county,
        constituency,
        ward,
      },
      username,
    };

    try {
      // Update Firebase Auth profile
      await firebaseUpdateProfile(auth.currentUser, {
        displayName: fullname,
        photoURL: profileImgURL,
      });

      // Update email if changed
      if (email !== user.email) {
        await updateEmail(auth.currentUser, email);
      }

      // Update user data in Firebase Realtime Database
      await set(dbRef(db, `users/${auth.currentUser.uid}`), updatedUserData);

      // Dispatch updated user data to Redux store
      dispatch(setUser({ ...user, ...updatedUserData }));

      MySwal.fire({
        title: "Profile Updated Successfully",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating profile:", error);
      MySwal.fire({
        title: "Update Failed",
        text: error.message,
        icon: "error",
      });
    }
  };

  // Handle password update
  const handlePasswordUpdate = async () => {
    if (password !== confirmPassword) {
      MySwal.fire({
        title: "Password Mismatch",
        text: "Passwords do not match.",
        icon: "error",
      });
      return;
    }

    try {
      await updatePassword(auth.currentUser, password);
      setPassword("");
      setConfirmPassword("");
      MySwal.fire({
        title: "Password Updated Successfully",
        icon: "success",
      });
    } catch (error) {
      MySwal.fire({
        title: "Password Update Failed",
        text: error.message,
        icon: "error",
      });
    }
  };
  return (
    <div className=" container profile_cont">
      <div className="profile_image_cont shadow mt-3">
        <div className="banner_image">
          <img src={bannerImageURL} alt="Banner" />
          <input
            onChange={(e) =>
              handleImageInputChange(e, setBannerImage, setBannerImageURL)
            }
            type="file"
            accept="image\*"
            id="banner_image_input"
            className={"image_input"}
          />
          <label className="label_banner_input" htmlFor="banner_image_input">
            <PhotoCameraRoundedIcon className="label_icon" />
          </label>
        </div>

        <div className="main_cont">
          <div className="profile_bio_cont">
            <div className="profile_pic">
              <img src={profileImageURL} alt="Profile Pic" />
              <input
                onChange={(e) =>
                  handleImageInputChange(e, setProfileImage, setProfileImageURL)
                }
                type="file"
                accept="image\*"
                id="profile_image_input"
                className={"image_input"}
              />
              <label
                className="label_profile_input"
                htmlFor="profile_image_input"
              >
                <PhotoCameraRoundedIcon className="label_icon" />
              </label>
            </div>
            <div className="profile_info">
              <div className="profile_handle_info">
                <div className="profile_name">{user.name}</div>
                <div className="profile_username">@{user.username}</div>
              </div>
            </div>
          </div>

          <div className="personal_details_cont">
            <span>
              <div className="detail_category">Account Info</div>
              <form className="edit_profile_form">
                <input
                  type="text"
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full Name"
                  defaultValue={user.name}
                />
                <input
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  defaultValue={user.email}
                />
                <input
                  type="text"
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="@username"
                  defaultValue={user.username}
                />
                <input
                  type="text"
                  onChange={(e) => setPoliticalParty(e.target.value)}
                  placeholder="Political Party"
                  defaultValue={user.politicalParty}
                />

                <div className={"ageChoices"}>
                  <span className={"custom_checkbox_cont"}>
                    <label htmlFor="age1" className={"checkbox_cont"}>
                      <input
                        type="radio"
                        name="age-type"
                        className={"checkbox"}
                        defaultChecked={user.ageGroup === "18-30"}
                        onChange={(e) => setAge(e.target.value)}
                        value="18-30"
                        id="age1"
                      />

                      <span className={"custom_checkbox"}></span>
                    </label>
                    <span className={"checkbox_text"}>18 - 30 Years</span>
                  </span>

                  <span className={"custom_checkbox_cont"}>
                    <label htmlFor="age2" className={"checkbox_cont"}>
                      <input
                        type="radio"
                        name="age-type"
                        defaultChecked={user.ageGroup === "31-40"}
                        className={"checkbox"}
                        onChange={(e) => setAge(e.target.value)}
                        value="31-40"
                        id="age2"
                      />
                      <span className={"custom_checkbox"}></span>
                    </label>
                    <span className={"checkbox_text"}>31 - 40 Years</span>
                  </span>

                  <span className={"custom_checkbox_cont"}>
                    <label htmlFor="age3" className={"checkbox_cont"}>
                      <input
                        type="radio"
                        name="age-type"
                        className={"checkbox"}
                        defaultChecked={user.ageGroup === "41-50"}
                        onChange={(e) => setAge(e.target.value)}
                        value="41-50"
                        id="age3"
                      />
                      <span className={"custom_checkbox"}></span>
                    </label>
                    <span className={"checkbox_text"}>41 - 50 Years</span>
                  </span>

                  <span className={"custom_checkbox_cont"}>
                    <label htmlFor="age4" className={"checkbox_cont"}>
                      <input
                        type="radio"
                        name="age-type"
                        className={"checkbox"}
                        defaultChecked={user.ageGroup === "50+"}
                        onChange={(e) => setAge(e.target.value)}
                        value="50+"
                        id="age4"
                      />
                      <span className={"custom_checkbox"}></span>
                    </label>
                    <span className={"checkbox_text"}>50 Years +</span>
                  </span>
                </div>
              </form>
            </span>

            <span>
              <div className="detail_category">Location Info</div>
              <form className="edit_profile_form">
                <div className="more_info">
                  <select
                    className="selectDropDown"
                    name="aspirancy"
                    onChange={(e) => setAspirancy(e.target.value)}
                    id="aspirancy"
                  >
                    <option defaultValue={user.aspirancy} disabled selected>
                      {user.aspirancy}
                    </option>
                    <option value="1">Not an Aspirant</option>
                    <option value="2">President</option>
                    <option value="3">Governor</option>
                    <option value="4">Dep-Governor</option>
                    <option value="5">MP</option>
                    <option value="6">Women-rep</option>
                    <option value="7">MCA</option>
                  </select>

                  <select
                    onChange={(e) => handleCountyChange(e)}
                    name="county"
                    id="county"
                    className="selectDropDown"
                  >
                    <option defaultValue={user.county} disabled selected>
                      {user.county}
                    </option>
                    {countyDataArr.map((countyInstance) => (
                      <option value={countyInstance.id}>
                        {countyInstance.name}
                      </option>
                    ))}
                  </select>

                  <select
                    onChange={(e) => handleConstituencyChange(e)}
                    name="constituency"
                    id="constituency"
                    className="selectDropDown"
                  >
                    <option defaultValue={user.constituency} disabled selected>
                      {user.constituency}
                    </option>
                    {constituencyDataArr.map((constituencyInstance) => (
                      <option value={constituencyInstance.id}>
                        {constituencyInstance.name}
                      </option>
                    ))}
                  </select>

                  <select
                    onChange={(e) => handleWardChange(e)}
                    name="ward"
                    id="ward"
                    className="selectDropDown"
                  >
                    <option defaultValue={user.ward} disabled selected>
                      {user.ward}
                    </option>
                    {wardDataArr.map((wardInstance) => (
                      <option value={wardInstance.id}>
                        {wardInstance.name}
                      </option>
                    ))}
                  </select>
                </div>
              </form>
            </span>

            <span className="submit_btn_span">
              <button
                type="button"
                onClick={handleUpdateProfile}
                className="submit_btn"
              >
                Update Profile
              </button>
            </span>

            <span>
              <div className="detail_category">Change Password</div>
              <form className="edit_profile_form">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="New Password"
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm Password"
                />
              </form>
            </span>

            <span className="submit_btn_span">
              <button
                onClick={handlePasswordUpdate}
                type="button"
                className="submit_btn"
              >
                Save Password
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
