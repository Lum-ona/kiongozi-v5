import React from "react";
import "./assets/styles/TwitterWidgets.css";
import {
  TwitterTimelineEmbed,
  TwitterShareButton,
  TwitterTweetEmbed,
} from "react-twitter-embed";

function TwitterWidgets() {
  return (
    <div className="twitterWidgets">
      <h5 className="text-center">What's happening</h5>
      <TwitterTweetEmbed tweetId={"1474433909186256898"} />

      <TwitterTimelineEmbed options={{ height: 100 }} />
      <TwitterShareButton
      // url={"https://facebook.com/cleverprogrammer"}
      // options={{ text: "#reactjs is awesome", via: "cleverqazi" }}
      />
    </div>
  );
}

export default TwitterWidgets;
