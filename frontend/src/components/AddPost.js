import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Box, Card, CardHeader, Heading, Text } from "@chakra-ui/react";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import WithSubnavigation from "./Navbar";
import { AuthState } from "./authProvider";



const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const user = AuthState().user;
  const toast = useToast();
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);

  // Redirect to login if user is not authenticated
  if (!user?.accessToken) {
    navigate("/login");
    toast({
      title: "Please login first",
      status: "warning",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }

  const submitHandler = async () => {
    setLoading(true);
    if (!title || !body) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }

    try {
      // Make the axios post request
      const data = await axios.post(
        "http://localhost:5000/posts",
        { title, body, image: pic },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user?.accessToken}`,
          },
        }
      );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "chat-app");
      axios
        .post("https://api.cloudinary.com/v1_1/di9k9dfdp/image/upload", data)
        .then((res) => {
          const data = res.data;
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  };

  return (
    <Box
    style={{
      backgroundImage: `url('https://static.vecteezy.com/system/resources/previews/005/927/984/original/black-and-white-geometric-background-with-cubes-vector.jpg')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      height: '100vh',
    }}>
    <WithSubnavigation />

    <Box
    display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      margin="100px"
>
  
      <Card p={4}>
      <Heading
        as="h4"
        size="md"
        mb={4}
        p={2}
        bgColor="white"
        color="black"
        transition="background-color 0.2s"
        _hover={{
          bgColor: "gray.200",
          cursor: "pointer",
        }}
        >
          Add Post
        </Heading>
        <VStack spacing="5px" color="black">
          <FormControl id="title" isRequired>
            <FormLabel>Title</FormLabel>
            <Input
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </FormControl>

          <FormControl id="body" isRequired>
            <FormLabel>Body</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter your description"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </InputGroup>
          </FormControl>

          {/* <FormControl id="body" isRequired>
            <FormLabel>Location</FormLabel>
            <InputGroup>
              <Input
                type="text"
                placeholder="Enter your location"
                onChange={(e) => setBody(e.target.value)}
                value={body}
              />
            </InputGroup>
          </FormControl> */}

          <FormControl id="pic">
            <Input
              type="file"
              p={1.5}
              accept="image/*"
              onChange={(e) => postDetails(e.target.files[0])}
            />
          </FormControl>

          <Button
            isLoading={loading}
            width="100%"
            colorScheme="blue"
            style={{ marginTop: 15 }}
            onClick={submitHandler}
          >
            Submit
          </Button>
        </VStack>
      </Card>
    </Box>
    </Box>
  );
};

export default AddPost;
