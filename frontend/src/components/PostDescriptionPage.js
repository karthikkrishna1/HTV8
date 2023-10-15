import { Box, Card, CardHeader, Heading, Text, VStack } from "@chakra-ui/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";

const PostDescriptionPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPost = async () => {
      try {
        const data = await axios.get(`http://localhost:5000/posts/${id}`);
        console.log(data);
        setPost(data.data.populatedPost);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);
  return (
    <>
      {loading ? (
        <Text>Fetching Details</Text>
      ) : post.comments.length ? (
        post?.comments?.map((comment) => {
          return (
            <VStack>
              <Card margin={3} width={"xs"} _hover={{ boxShadow: "dark-lg" }}>
                <CardHeader>
                  <Text fontSize={"2xl"} fontWeight={"bold"}>
                    {comment.user.username}
                  </Text>
                </CardHeader>
                <Text>{comment.text}</Text>
              </Card>
            </VStack>
          );
        })
      ) : (
        <Text>No Comments</Text>
      )}
    </>
  );
};

export default PostDescriptionPage;
