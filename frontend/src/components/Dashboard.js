import React, { useEffect, useState } from "react";
import axios from "axios";
import { VStack, Box, Heading } from "@chakra-ui/react";
import WithSubnavigation from "./Navbar";
import Post from "./Post";
import "./Dashboard.css";

const Dashboard = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const { data } = await axios.get("http://localhost:5000/posts");
        const { posts: allPosts } = data;
        setPosts(allPosts);
      } catch (err) {
        console.error(err); // Changed to console.error for better error handling.
      }
    };

    getPosts();
  }, []);

  return (
    <Box
      backgroundImage="url(https://static.vecteezy.com/system/resources/previews/005/927/984/original/black-and-white-geometric-background-with-cubes-vector.jpg)"
      backgroundPosition="center"
      backgroundSize="cover"
      height="100vh"
    >
      <WithSubnavigation />
      <Box >
      <Heading
        as="h4"
        size="md"
        mb={4}
        p={2}
        bgColor="gray.00"
        color="white"
        transition="background-color 0.2s"
        _hover={{
          bgColor: "gray.00",
          cursor: "pointer",
        }}
        >
          Feed
        </Heading>
        <VStack spacing={100}>
          {posts.map((post) => (
            <Box key={post._id} h="500px"
            >
            <Post post={post} />
          </Box>
          ))}
        </VStack>
      </Box>
    </Box>
  );
};

export default Dashboard;
