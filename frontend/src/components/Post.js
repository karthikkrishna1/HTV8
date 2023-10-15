import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Text,
  Wrap,
  WrapItem,
  Avatar,
  Image,
  Box,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router";

const Post = ({ post }) => {
  const navigate = useNavigate();

  const openPost = () => {
    navigate(`posts/${post._id}`);
  };

  return (
    <Card
      key={post._id}
      onClick={openPost}
      width="100%" // Make the card full width
      borderRadius="xl" // Increase border radius for a more rounded look
      cursor="pointer"
      _hover={{ boxShadow: "lg" }} // Use a slightly larger shadow on hover for aesthetics
      transition="box-shadow 0.2s"
    >
      <CardHeader
        display="flex"
        justifyContent="flex-start"
        alignItems="center"
        p={4}
      >
        <Wrap spacing={4}> {/* Increase spacing between avatar and text */}
          <WrapItem>
            <Avatar src={post.Sender.image} />
          </WrapItem>
          <Box>
            <Text fontWeight="bold" fontSize="lg"> {/* Increase font size for a bolder look */}
              {post.Sender.username}
            </Text>
            <Text fontSize="md" color="gray.600"> {/* Use a lighter text color */}
              {post.title}
            </Text>
          </Box>
        </Wrap>
      </CardHeader>
      <CardBody>
        <Image
          src={post.image || "https://th.bing.com/th/id/OIP.qZgnt9IbdzjsdIHKRb357gHaEK?pid=ImgDet&rs=1"}
          borderRadius="lg"
          objectFit="cover"
          height="400px" // Set a fixed height for the image
          width="100%" // Make the image full-width within the card
        />
        <Text fontSize="lg" p={4}> {/* Increase font size for the post body */}
          {post.body}
        </Text>
      </CardBody>
    </Card>
  );
};

export default Post;
