import WithSubnavigation from "./Navbar";
import axios from "axios";

import React, { useEffect, useState } from "react";
import Post from "./Post";
import { VStack } from "@chakra-ui/react";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  console.log(posts);
  useEffect(() => {
    const getposts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/posts");

        const { posts: allPosts } = data;
        setPosts(allPosts);
      } catch (err) {
        console.log(err);
      }
    };

    getposts();
  }, []);
  return (
    <>
      <WithSubnavigation />
      <VStack spacing={4} p={4}>
        {posts.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </VStack>
    </>
  );
};

export default Dashboard;
