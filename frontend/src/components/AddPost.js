import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
import { AuthState } from "./authProvider";
const AddPost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const user = AuthState().user;
  console.log(user?.accessToken);

  const toast = useToast();
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  if (!user?.accessToken) {
    navigate("/login");
    toast({
      title: "Please login First",
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
      //   if (err.response.status === 403) {
      //     localStorage.removeItem("userInfo");
      //     navigate("/login");
      //   }
    }
  };
  const postDetails = (pics) => {
    console.log(pics);
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "Please select an Image",
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
    <VStack spacing="5px" color="black">
      <FormControl id="title" isRequired>
        <FormLabel>Title</FormLabel>
        <Input
          value={title}
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="body" isRequired>
        <FormLabel>Body</FormLabel>
        <InputGroup>
          <Input
            type="text"
            placeholder="Enter your password"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></Input>
        </InputGroup>
      </FormControl>

      <FormControl id="pic">
        <Input
          type="file"
          p={1.5}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        ></Input>
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
  );
};

export default AddPost;
