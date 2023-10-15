import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Text,
  WrapItem,
  Avatar,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Post = ({ post }) => {
  const navigate = useNavigate();
  console.log(post);
  return (
    <Card
      key={post._id}
      onClick={() => navigate(`posts/${post._id}`)}
      width={"sm"}
      _hover={{ boxShadow: "dark-lg" }}
    >
      <CardHeader
        display={"flex"}
        justifyContent={"flex-start"}
        alignItems={"center"}
      >
        <WrapItem>
          <Avatar margin={"5"} src={post.Sender.image} />
        </WrapItem>
        <Box>
          <Text>{post.Sender.username}</Text>
          <Text>{post.title}</Text>
        </Box>
      </CardHeader>
      <CardBody>
        <Image
          src={
            post.image ||
            "https://th.bing.com/th/id/OIP.qZgnt9IbdzjsdIHKRb357gHaEK?pid=ImgDet&rs=1"
          }
        />
        <Text>{post.body}</Text>
      </CardBody>
    </Card>
  );
};

export default Post;
