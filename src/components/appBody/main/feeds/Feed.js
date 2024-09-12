import React, { useState } from "react";
import { Avatar } from "@mui/material";
import dayjs from "dayjs";
import RelativeTime from "dayjs/plugin/relativeTime";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import "./assets/styles/Feed.css";
import { Link } from "react-router-dom";
// import ReadMore from "../../../layout/ReadMore";
import CommentPage from "../../../../pages/CommentPage";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";
// import { RWebShare } from "react-web-share";

dayjs.extend(RelativeTime);

function Feed({ postData, content, media, userData }) {
  const [image, setImage] = useState("");
  const [commentsModal, setCommentModal] = useState(false);
  useState(() => {
    if (media?.length > 0) {
      setImage(media[0]?.mediaUrl);
    }
  }, []);

  const showComments = () => {
    setCommentModal(!commentsModal);
  };
  return (
    <div className="feed shadow mt-3 mb-3">
      <div className="feed_header">
        {userData.profilePhotoURL ? (
          <Avatar src={userData.profilePhotoURL} />
        ) : (
          <Avatar>{userData.username.charAt(0).toUpperCase()}</Avatar>
        )}
        <div className="feed_header_left mx-3">
          <Link
            style={{ textDecoration: "none" }}
            to={`/profile/${userData.userId}`}
          >
            <h5>{userData.username}</h5>
          </Link>

          <div className="feed_heder_left_bottom">
            <p>{userData.aspirancy}</p>
            <p>
              {postData.createdAt && dayjs(postData.createdAt).fromNow(true)}{" "}
              ago
            </p>
          </div>
        </div>
      </div>
      <hr style={{ marginTop: "-5px" }} />

      <div className="feed_body">
        <p>
          {/* <ReadMore>{content}</ReadMore> */}
          {content}
        </p>

        {/* <Link to="/comment/01"> */}
        {image !== "" && <img className="img" src={image} alt="Feed" />}

        {/* </Link> */}
      </div>

      <hr style={{ marginTop: "-5px" }} />
      <div className="feed_footer mt-4">
        <div className="d-flex align-items-center">
          <span className="mx-1">{postData.likes}</span>
          <FavoriteBorderIcon />
        </div>
        <div className="d-flex align-items-center">
          <span className="mx-1">{postData.comments}</span>
          <CommentOutlinedIcon onClick={showComments} />
        </div>

        {/* <ShareOutlinedIcon /> */}
      </div>
      {commentsModal && (
        <CommentPage
          onCancel={showComments}
          onClick={showComments}
          postId={postData.id}
        />
      )}
    </div>
  );
}

export default Feed;
