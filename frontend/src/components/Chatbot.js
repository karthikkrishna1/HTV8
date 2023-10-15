import React, { useState } from "react";
import axios from "axios";
import { Box, Button, Input, Text, Heading } from "@chakra-ui/react";
import WithSubnavigation from "./Navbar";

const Chatbot = () => {
  const [messages, setMessages] = useState([{ message: "Hi", owner: "chatbot" }]);
  const [curMessage, setCurrMessage] = useState("");

  const handleSubmit = async () => {
    const messageObj = { message: curMessage, owner: "user" };
    const axiosObj = { message: curMessage };
    const newMessages = [...messages];

    newMessages.push(messageObj);

    try {
      const { data } = await axios.post("http://localhost:5001/predict", JSON.stringify(axiosObj), {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const responseObj = { message: data.answer, owner: "chatbot" };
      newMessages.push(responseObj);
    } catch (error) {
      // Handle error gracefully
    }

    setMessages(newMessages);
    setCurrMessage("");
  };

  return (
    <Box>
      <WithSubnavigation />
    <Box
      backgroundImage="url('https://static.vecteezy.com/system/resources/previews/005/927/984/original/black-and-white-geometric-background-with-cubes-vector.jpg')" // Replace with your image URL
      backgroundPosition="center"
      backgroundSize="cover"
      minHeight="100vh"
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Box
        maxWidth="600px"
        width="100%"
        background="white" // Set your desired background color
        borderRadius="lg"
        boxShadow="md"
        padding="20px"
        margin="20px"
        display="flex"
        flexDirection="column"
      >
         <Heading
        as="h4"
        size="md"
        mb={4}
        p={2}
        bgColor="gray.00"
        color="black"
        transition="background-color 0.2s"
        _hover={{
          bgColor: "gray.00",
          cursor: "pointer",
        }}
        >
          Chatbot
        </Heading>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          {messages.map((messageObj, index) => (
            <Box
              key={index}
              backgroundColor={messageObj.owner === "user" ? "red" : "blue"}
              color="white"
              p={3}
              borderRadius="md"
              marginBottom="10px"
              boxShadow="lg"
              display="inline-block"
            >
              <Text fontSize="lg">{messageObj.message}</Text>
            </Box>
          ))}
        </div>

        <div style={{ display: "flex", marginTop: "20px" }}>
          <Input
            value={curMessage}
            onChange={(e) => setCurrMessage(e.target.value)}
            flex="1"
          />
          <Button onClick={handleSubmit} ml={3} size="md" colorScheme="blue">
            Submit
          </Button>
        </div>
        </Box>
      </Box>
    </Box>
  );
};

export default Chatbot;
