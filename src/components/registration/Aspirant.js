import React, { useState } from "react";
import "./assets/styles/Aspirant.css";
import PhotoCameraRoundedIcon from "@mui/icons-material/PhotoCameraRounded";
import { counties, constituencies, wards } from "./utils/location/locationData";
// import { handleFileUpload } from "../../utils/fileUploader";
// import Feedback from "../popup/Feedback";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Signup from "./Signup";
import { auth, db, storage } from "../../FirebaseConfig";
import {
  getDownloadURL,
  ref as storageRef,
  uploadBytes,
} from "firebase/storage";
import { ref, set } from "firebase/database";
import { setUser } from "../../redux/features/user/userSlice";
import { useDispatch } from "react-redux";

function Aspirant({ onJoinNow, payload }) {
  const DEFAULT_IMAGE =
    "https://www.pphfoundation.ca/wp-content/uploads/2018/05/default-avatar.png";
  const MySwal = withReactContent(Swal);
  const dispatch = useDispatch();

  const [uploadingProgress, setUploadingProgress] = useState(0);
  const [isPosting, setIsPosting] = useState(false);

  const [county, setCounty] = useState({ id: "", name: "" });
  const [constituency, setConstituency] = useState({ id: "", name: "" });
  const [ward, setWard] = useState({ id: "", name: "" });
  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [username, setUsername] = useState("");

  const [countyDataArr] = useState(counties);
  const [constituencyDataArr, setConstituencyData] = useState(constituencies);
  const [wardDataArr, setWardData] = useState(wards);

  const [aspirancy, setAspirancy] = useState("");

  counties.sort((countyA, countyB) => countyA.name.localeCompare(countyB.name));

  const getSelectOptionsData = (elementId, getDataValue) => {
    const selectElement = document.getElementById(elementId);
    const valueId = selectElement.value;
    getDataValue(valueId);
  };

  const findCountyName = (countyId) => {
    const foundCounty = countyDataArr.find((data) => data.id === countyId);
    setCounty(foundCounty.name);
  };

  const findConstituenciesInCounty = (countyId) => {
    const constituenciesFound = constituencies.filter(
      (data) => data.countyId === countyId
    );
    // console.log(constituenciesFound)
    setConstituencyData(constituenciesFound);
    // console.log(constituenciesFound)
    getSelectOptionsData("constituency", findConstituencyName);
  };

  const findConstituencyName = (constituencyId) => {
    const foundConstituency = constituencyDataArr.find(
      (data) => data.id === constituencyId
    );

    // console.log(foundConstituency)

    if (foundConstituency) {
      setConstituency(foundConstituency.name);
    } else {
      setConstituency("");
    }
    // console.log(foundConstituency)
  };

  const findWardsInCounty = (countyId) => {
    const wardsFound = wards.filter((data) => data.countyId === countyId);
    setWardData(wardsFound);
    getSelectOptionsData("ward", findWardName);
  };

  const findWardsInConstituency = (constituencyId) => {
    const wardsFound = wards.filter(
      (data) => data.constituencyId === constituencyId
    );
    setWardData(wardsFound);
    getSelectOptionsData("ward", findWardName);
  };

  const findWardName = (wardId) => {
    const foundWard = wardDataArr.find((data) => data.id === wardId);

    // console.log(foundWard)

    if (foundWard) {
      setWard(foundWard.name);
    } else {
      setWard("");
    }
  };

  const handleInputChange = (setValue, e) => setValue(e.target.value);

  const handleCountyChange = (e) => {
    const countyId = e.target.value;
    findCountyName(countyId);
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

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = () => setImageURL(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAspirantSubmit = (e) => {
    e.preventDefault();
    setIsPosting(true);

    const userId = auth.currentUser.uid;

    if (image) {
      const storageReference = storageRef(
        storage,
        `profileImages/${userId}/${image.name}`
      );
      uploadBytes(storageReference, image)
        .then((snapshot) => {
          const progress_ = snapshot.bytesTransferred / snapshot.totalBytes;
          setUploadingProgress((progress_ * 100).toFixed());
          return getDownloadURL(snapshot.ref); // Get the URL after successful upload
        })
        .then((downloadURL) => {
          submitData(downloadURL); // Pass the URL to submitData
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    } else {
      submitData(DEFAULT_IMAGE); // Use a default image if none is uploaded
    }
  };

  const submitData = (imageUrl) => {
    const userId = auth.currentUser.uid;
    const userRef = ref(db, "users/" + userId); // Update the user in "users" node
    const aspirantData = {
      ...payload,
      location: { county: county, constituency: constituency, ward: ward },
      profilePhotoURL: imageUrl,
      username: username,
      aspirancy: aspirancy,
      // Include previously collected data (e.g., name, email, politicalParty)
    };
    set(userRef, aspirantData) // You can use update() if you only want to update some fields
      .then(() => {
        console.log("Aspirant profile saved successfully");

        // Update user data in Redux
        dispatch(setUser(aspirantData));

        MySwal.fire({
          title: "Success!",
          text: "Registration successful. Time to login!",
          icon: "success",
          confirmButtonText: "OK",
        });
        onJoinNow(); // Proceed to the next action after successful registration
      })
      .catch((error) => {
        setIsPosting(false);
        MySwal.fire({
          title: "Oops...",
          text: error.message,
          icon: "error",
          confirmButtonText: "Ok",
        });
        console.error("Error saving aspirant data:", error);
      });
  };

  const [signupModule, setSignupModule] = useState(false);
  const showSignupModule = () => {
    setSignupModule(true);
  };

  return (
    <React.Fragment>
      {signupModule ? (
        <Signup />
      ) : (
        <div className="aspirant">
          <form onSubmit={handleAspirantSubmit}>
            <div className="back_btn">
              <p onClick={showSignupModule}>Back</p>
            </div>
            <div className={"profile_pic_cont"}>
              {imageURL.length > 0 ? (
                <img src={imageURL} alt="Kenya Flag" />
              ) : (
                <PhotoCameraRoundedIcon
                  style={{ color: "rgb(40, 167, 70)", fontSize: 35 }}
                />
              )}
              <input
                onChange={(e) => handleImageInputChange(e)}
                type="file"
                accept="image\*"
                id="profile_pic_input"
                className={"profile_pic_input"}
              />
              <label htmlFor="profile_pic_input"></label>
            </div>

            <input
              type="text"
              onChange={(e) => handleInputChange(setUsername, e)}
              placeholder="@username"
            />

            <div className="more_info">
              <select
                className="selectDropDown"
                onChange={(e) => handleInputChange(setAspirancy, e)}
                name="aspirancy"
                id="aspirancy"
              >
                <option defaultValue="" disabled selected>
                  ---Aspirancy---
                </option>
                <option value="non aspirant">Not an Aspirant</option>
                <option value="president">President</option>
                <option value="deputy president">Deputy President</option>
                <option value="governor">Governor</option>
                <option value="deputy governor">Deputy Governor</option>
                <option value="senator">Senator</option>
                <option value="mp">Member of Parliament</option>
                <option value="women representative">
                  Women Representative
                </option>
                <option value="mcs">Member of County Assembly</option>
              </select>

              <select
                onChange={(e) => handleCountyChange(e)}
                name="county"
                id="county"
                className="selectDropDown"
              >
                <option defaultValue="" disabled selected>
                  ---County---
                </option>
                {countyDataArr.map((countyInstance, index) => (
                  <option key={index} value={countyInstance.id}>
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
                <option defaultValue="" disabled selected>
                  ---Constituency---
                </option>
                {constituencyDataArr.map((constituencyInstance, index) => (
                  <option key={index} value={constituencyInstance.id}>
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
                <option defaultValue="" disabled selected>
                  ---Ward---
                </option>
                {wardDataArr.map((wardInstance, index) => (
                  <option key={index} value={wardInstance.id}>
                    {wardInstance.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" style={isPosting ? { fontSize: 10 } : {}}>
              {!isPosting
                ? "Complete Profile"
                : `Completing profile ... ${uploadingProgress}%`}
            </button>
          </form>
        </div>
      )}
    </React.Fragment>
  );
}

export default Aspirant;
