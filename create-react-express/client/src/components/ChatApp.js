import React, { useState, useEffect, useRef } from "react";
// import { NavLink } from 'react-router-dom';
import styled from "styled-components";
import io from "socket.io-client";
import { Redirect } from "react-router-dom";
// import List from "../list";

const Page = styled.div`
  display: flex;
  height: 100%;
  width: 95%;
  align-items: centre;
  background-color: #FFFFFF;
  flex-direction: column;
  border: 2px solid black;
  border-radius: 10px;
  padding-bottom: 10px;
  overflow: auto;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 500px;
  max-height: 500px;
  overflow: auto;
  width: 90%;
  border: 2px solid black;
  border-radius: 10px;
  padding-bottom: 10px;
  margin-top: 25px;
  margin-left: 5%;
`;

const TextArea = styled.textarea`
  width: 100%;
  height: 100px;
  border-radius: 10px;
  margin-top: 10px;
  padding-left: 10px;
  padding-top: 10px;
  font-size: 17px;
  background-color: transparent;
  border: 2px solid black;
  outline: none;
  color: black;
  letter-spacing: 1px;
  line-height: 20px;
  ::placeholder {
    color: black;
  }
  margin-left: 0%;
`;

const Button = styled.button`
  background-color: blue;
  width: 100%;
  border: none;
  height: 50px;
  border-radius: 10px;
  color: white;
  font-size: 17px;
  margin-left: 0%;
`;

const Form = styled.form`
  width: 90%;
  margin-left: 5%;
`;

const MyRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
`;

const MyMessage = styled.div`
  width: 45%;
  background-color: blue;
  color: white;
  padding: 10px;
  margin-right: 5px;
  text-align: center;
  border-top-right-radius: 10%;
  border-bottom-right-radius: 10%;
`;


const MessageName = styled.div`
  font-weight: 600;
  font-size: 14px;
  margin-right: 8px;
`;

const PartnerRow = styled(MyRow)`
  justify-content: flex-start;
`;

const PartnerMessage = styled.div`
  width: 45%;
  background-color: transparent;
  color: lightblue;
  border: 1px solid lightblue;
  padding: 10px;
  margin-left: 5px;
  text-align: center;
  border-top-left-radius: 10%;
  border-bottom-left-radius: 10%;
`;

const ChatApp = (props) => {

  console.log(props);

  const [yourID, setYourID] = useState();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socketRef = useRef();

  useEffect(() => {
    socketRef.current = io.connect('/');

    socketRef.current.on("your id", id => {
      setYourID(id);
    })

    socketRef.current.on("message", (message) => {
      console.log("here");
      receivedMessage(message);
    })
  }, []);

  function receivedMessage(message) {
    setMessages(oldMsgs => [...oldMsgs, message]);
  }

  function sendMessage(e) {
    e.preventDefault();

    const messageObject = {
      body: message,
      id: yourID,
      // userA = me,
      // userB = opponent,
    };
    setMessage("");
    socketRef.current.emit("send message", messageObject);
  }

  function handleChange(e) {
    setMessage(e.target.value);
  }

  return (
    <Page>
      <Container>
        {messages.map((message, index) => {
          if (message.id === yourID) {
            return (
              <MyRow key={index}>
                <MyMessage>
                  {message.body}
                </MyMessage>
                <MessageName>
                  {props.me}
                </MessageName>
              </MyRow>
            )
          }
          return (
            <PartnerRow key={index}>
              <PartnerMessage>
                {message.body}
              </PartnerMessage>
              <MessageName>
                {props.opponent}
              </MessageName>
            </PartnerRow>
          )
        })}
      </Container>
      <Form onSubmit={sendMessage}>
        {/* <TextArea value={name} onChange={handleChange} placeholder="Whats your displayname?" /> */}
        <TextArea value={message} onChange={handleChange} placeholder="Say something..." />
        <Button>Send</Button>
      </Form>
    </Page>
  );
};

export default ChatApp;
