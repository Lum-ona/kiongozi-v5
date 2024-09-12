import { Avatar } from "@mui/material";
import React, { useLayoutEffect, useState } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CancelIcon from "@mui/icons-material/Cancel";
import { useSelector } from "react-redux";
import "../styles/CommentPage.css";
import { ref, onValue, push } from "firebase/database";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { db } from "../FirebaseConfig";
import Comment from "./layout/Comment";

const MySwal = withReactContent(Swal);

function CommentPage({ onClick, onCancel, postId }) {
  const user = useSelector((state) => state.user);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments from Firebase when the component is mounted
  useLayoutEffect(() => {
    const commentsRef = ref(db, `comments/${postId}`);
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentArray = Object.keys(data).map((key) => ({
          comment: data[key].comment,
          user: data[key].user,
        }));
        setComments(commentArray);
      }
    });
  }, [postId]);

  // Handle comment creation and store it in Firebase
  const handleCommentCreate = async (e) => {
    e.preventDefault();

    const newCommentRef = push(ref(db, `comments/${postId}`));
    const payload = {
      user: {
        userId: user.userId,
        username: user.username,
        profilePhotoURL: user.profilePhotoURL,
      },
      comment: newComment,
    };

    try {
      await newCommentRef.set(payload);
      MySwal.fire({
        title: "Comment Created",
        icon: "success",
      });
      setNewComment(""); // Clear the comment input
    } catch (err) {
      MySwal.fire({
        title: "Error",
        text: "Failed to post comment!",
        icon: "error",
      });
    }
  };

  return (
    <div
      className="backdrop p-5"
      role="dialog"
      data-backdrop="static"
      data-keyboard="false"
      data-toggle="modal"
    >
      <div className="comment_top">
        <div className="comment_input">
          <div className="input_top">
            <Avatar className="avatar" src={user.profilePhotoURL} />
            <CancelIcon className="cancel_btn" onClick={onCancel} />
          </div>
          <div className="input_bottom">
            <input
              className="mx-3"
              placeholder="Write your comment.."
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              className="comment_btn rounded-pill"
              type="submit"
              onClick={(e) => handleCommentCreate(e)}
            >
              Comment
            </button>
          </div>
        </div>
        <hr />
        <p className="subtitle_comment">
          People's comments <ArrowDropDownIcon />
        </p>
      </div>

      <div className="comments_body">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Comment
              key={index}
              commentData={comment.comment}
              userData={comment.user}
            />
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>

      {/* Example usage of onClick */}
      <button className="action_btn" onClick={onClick}>
        Take Action
      </button>
    </div>
  );
}

export default CommentPage;
