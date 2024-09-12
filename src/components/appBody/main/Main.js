import React, { useState, useLayoutEffect } from "react";
import "./assets/styles/Main.css";
import Feed from "./feeds/Feed";
import Post from "./post/Post";
// import DisplayUsers from "../../layout/DisplayUsers";
import InfiniteScroll from "react-infinite-scroll-component";
import { onValue, ref } from "firebase/database";
import { db } from "../../../FirebaseConfig";

function Main() {
  const [posts, setPosts] = useState([]);

  useLayoutEffect(() => {
    const postsRef = ref(db, "posts");
    onValue(
      postsRef,
      (snapshot) => {
        const data = snapshot.val();

        if (data) {
          // Check if data is not null or undefined
          const postsArray = Object.keys(data).map((key) => ({
            post: data[key],
            details: {
              user: data[key].userData,
            },
          }));
          setPosts(postsArray);
        } else {
          setPosts([]); // Clear posts if data is not available
        }
      },
      (error) => {
        console.error("Error fetching posts:", error);
        setPosts([]); // Clear posts if there's an error
      }
    );
  }, []);

  return (
    <div className="main mt-5 mx-md-4 ">
      <Post />
      {/* <DisplayUsers /> */}

      <InfiniteScroll
        dataLength={posts.length}
        className="d-flex flex-column align-items-center"
      >
        {posts.map((post) => (
          <Feed
            key={post.post.id}
            postData={post.post}
            content={post.post.content}
            media={post.post.media}
            userData={post.details.user}
          />
        ))}
      </InfiniteScroll>
    </div>
  );
}

export default Main;
