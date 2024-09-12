import { Avatar } from "@mui/material";
import React from "react";
// import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
// import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";

import "./assets/styles/Comments.css";
// import IconOptions from "../layout/IconOptions";
import ReadMore from "./ReadMore";

function Comment({ commentData, userData}) {
  return (
    <div className="comments shadow">
      <Avatar/>
      <div className="rightSide_comments ">
        <h6>{userData.username}</h6>
        <p>{userData.aspirancy}</p>
        <div className="posted_comments">
          <p>
            <ReadMore max={75}>
             {commentData.comment}
            </ReadMore>
          </p>
        </div>
        {/* <hr />
        <div className="bottom_rightSide">
          <IconOptions Icon={ThumbUpOutlinedIcon} />
          <IconOptions Icon={ShareOutlinedIcon} />
        </div> */}
      </div>
    </div>
  );
}

export default Comment;
