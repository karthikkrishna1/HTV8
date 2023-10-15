import React, { useState } from "react";
import WithSubnavigation from "./Navbar";
import axios from "axios";
import { Box, Button, Input, Text } from "@chakra-ui/react";
const Chatbot = () => {
  const [messages, setMessages] = useState([
    { message: "Hi", owner: "chatbot" },
  ]);
  const [curMessage, setCurrMessage] = useState("");
  const handleSubmit = async () => {
    const messageObj = { message: curMessage, owner: "user" };
    const axiosObj = { message: curMessage };
    let newMessages = [...messages];
    newMessages.push(messageObj);
    const { data } = await axios.post(
      "http://localhost:5001/predict",
      JSON.stringify(axiosObj),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const responseObj = { message: data.answer, owner: "chatbot" };
    newMessages.push(responseObj);
    setMessages(newMessages);
    setCurrMessage("");
  };
  return (
    <>
      <WithSubnavigation />
      <Box>
        {messages.map((messageobj) => {
          return (
            <Box bgColor={messageobj.owner === "user" ? "red" : "blue"}>
              <Text>{messageobj.message}</Text>
            </Box>
          );
        })}
      </Box>
      <Input
        value={curMessage}
        onChange={(e) => setCurrMessage(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit</Button>
    </>
  );
};

export default Chatbot;
