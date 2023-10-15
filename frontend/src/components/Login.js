import React, { useRef, useState } from "react";
import { VStack } from "@chakra-ui/layout";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "@chakra-ui/react";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [show, setShow] = useState(false);
  //const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const toast = useToast();

  const showRef = useRef();
  const submitHandler = async () => {
    //setLoading(true);
    if (!username || !password) {
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
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        { user: username, pwd: password },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      localStorage.setItem("userInfo", JSON.stringify(data));
      toast({
        title: "Login Successfull",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      navigate("/");
    } catch (err) {
      console.log(err);
      toast({
        title:
          err.response.status === 401 ? "Invalid Username/Password" : "Error",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
  };

  const handleClick = () => {
    setShow(!show);
    showRef.current.focus();
  };
  return (
    <VStack spacing="5px" color="black">
      <FormControl id="username" isRequired>
        <FormLabel>Username</FormLabel>
        <Input
          value={username}
          placeholder="Enter your Username"
          onChange={(e) => setUsername(e.target.value)}
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

      <Button
        width="100%"
        colorScheme="blue"
        style={{ marginTop: 15 }}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
};

export default Login;
