import WithSubnavigation from "./Navbar";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Post from "./Post";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const getposts = async () => {
      const { posts: allPosts } = await axios.get(
        "http://localhost:5000/posts"
      );
      setPosts(allPosts);
      console.log(allPosts);
    };
    getposts();
  }, []);
  return (
    <>
      <WithSubnavigation />
      {posts.map((post) => (
        <Post post={post} />
      ))}
    </>
  );
};

export default Dashboard;
