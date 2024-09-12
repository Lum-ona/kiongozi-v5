import React, { useEffect, useState } from "react";
import { Avatar } from "@mui/material";
import ImageIcon from "@mui/icons-material/Image";
import {
  ref as refStorage,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { ref as dbRef, push, set } from "firebase/database";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import "./assets/styles/Post.css";
import { auth, db, storage } from "../../../../FirebaseConfig";

const MySwal = withReactContent(Swal);

function Post() {
  const [isPosting, setIsPosting] = useState(false);

  const [image, setImage] = useState(null);
  const [imageURL, setImageURL] = useState("");
  const [mediaType, setMediaType] = useState("");
  const [postText, setPostText] = useState("");
  const [, setShowLogin] = useState(false);
  const [disableBtn, setDisableBtn] = useState(true);

  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (!user.isLoggedIn) {
      console.log("User not logged in");
      setShowLogin(true);
      return;
    } else if (image || postText.length > 5) {
      console.log("User logged in and conditions met");
      setDisableBtn(false);
    } else {
      console.log("Conditions not met");
      setDisableBtn(true);
    }
  }, [image, postText, user]);

  const handleImageInputChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setMediaType(file.type);

      const reader = new FileReader();
      reader.addEventListener(
        "load",
        () => {
          if (reader.readyState === 2) {
            setImageURL(reader.result);
          }
        },
        false
      );

      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setImage(null);
    setImageURL("");
  };

  const handleCreatePost = async (payload) => {
    try {
      const newPostRef = push(dbRef(db, "posts"));
      await set(newPostRef, payload);
      setIsPosting(true);

      MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Post created successfully!",
      });
      window.location.reload(); // Consider updating the state instead of reloading
    } catch (err) {
      setIsPosting(false);

      console.error("Error creating post:", err);
      MySwal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong while creating the post!",
      });
    }
  };

  const handlePostUploadWithImage = async (imageLocation) => {
    const payload = {
      author: user.userId,
      content: postText,
      media: [
        {
          mediaType,
          mediaUrl: imageLocation,
        },
      ],
      userData: {
        username: user.username,
        profilePhotoURL: user.profilePhotoURL,
      },
    };
    await handleCreatePost(payload);
  };

  const handlePostSubmit = async (e) => {
    e.preventDefault();
    setIsPosting(true);

    if (image) {
      const storageRefPath = `posts/${auth.currentUser.uid}/${image.name}`;
      const storageRef = refStorage(storage, storageRefPath);
      try {
        await uploadBytes(storageRef, image);
        const imageLocation = await getDownloadURL(storageRef);
        await handlePostUploadWithImage(imageLocation);
      } catch (err) {
        setIsPosting(false);

        console.error("Error uploading image:", err);
        MySwal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error uploading image!",
        });
      }
    } else {
      const payload = {
        author: user.userId,
        content: postText,
        userData: {
          username: user.username,
          profilePhotoURL: user.profilePhotoURL,
        },
      };
      await handleCreatePost(payload);
    }

    removeImage();
    setPostText("");
  };

  return (
    <React.Fragment>
      <div className="post w-100 shadow-lg mb-5">
        <div className="post_top">
          <span>
            <Avatar src={user.profilePhotoURL} />
            <input
              style={{ border: "none" }}
              onChange={(e) => setPostText(e.target.value)}
              className="post_text_area"
              placeholder="Say something..."
            />
          </span>
          {imageURL && (
            <span>
              <button
                onClick={removeImage}
                type="button"
                className="remove_image"
              >
                &times;
              </button>
              <img src={imageURL} alt="Input" />
            </span>
          )}
        </div>
        <div className="post_bottom">
          <label htmlFor="post_image">
            <ImageIcon /> Image
          </label>
          <input
            onChange={handleImageInputChange}
            type="file"
            id="post_image"
            className="post_image"
            accept="image/*"
          />
          <button
            type="button"
            onClick={handlePostSubmit}
            className="file_upload"
            disabled={disableBtn}
            style={disableBtn ? { backgroundColor: "gray" } : {}}
          >
            {isPosting ? "Posting..." : "Post"}
          </button>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Post;
