import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button, useToast } from "@chakra-ui/react";
import axios from "axios";
const SignUp = () => {
  const [name, setName] = useState("");
  const [show, setShow] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const showRef = useRef();
  const toast = useToast();
  const navigate = useNavigate();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const handleClick = () => {
    setShow(!show);
    showRef.current.focus();
  };
  const submitHandler = async () => {
    setLoading(true);
    if (!name || !password || !confirmPassword) {
      toast({
        title: "Please fill all fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Please select an Image",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    try {
      const { data } = await axios.post(
        "http://localhost:5000/auth/register",
        { user: name, pwd: password, picture: pic },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      navigate("/login");
    } catch (err) {
      console.log(err);
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
      <FormControl id="first-name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          value={name}
          placeholder="Enter your name"
          onChange={(e) => setName(e.target.value)}
        ></Input>
      </FormControl>

      <FormControl id="password" isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            ref={showRef}
            type={show ? "text" : "password"}
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id="confirm-password" isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            placeholder="Enter your password again"
            onChange={(e) => setConfirmPassword(e.target.value)}
            value={confirmPassword}
          ></Input>
          <InputRightElement width="4.5rem">
            <Button h="1.75rem" size="sm" onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
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
        Sign Up
      </Button>
    </VStack>
  );
};

export default SignUp;
