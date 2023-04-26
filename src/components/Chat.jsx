import React, { useState } from "react";
import styled, { css } from "styled-components";
import ChatNavbar from "./ChatNavbar";
import { userContext } from "../context/userContext";
import MessageList from "./MessageList";
import SendMessage from "./SendMessage";
import { useAuth0 } from "@auth0/auth0-react";

function Chat({ open, setOpen }) {
  const { currentUser, dispatch } = userContext();
  const { user } = useAuth0();
  return (
    <ChatStyle
      onClick={() => {
        dispatch({ type: "CLOSE", payload: false });
      }}
      open={open}
    >
      {currentUser && (
        <>
          <ChatNavbar currentUser={currentUser} setOpen={setOpen} />
          <MessageList />
          <SendMessage user={user} />
        </>
      )}
    </ChatStyle>
  );
}

const ChatStyle = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  background: url("https://picsum.photos/seed/picsum/2000/3000");
  background-repeat: no-repeat;
  background-size: cover;
  @media only screen and (max-width: 770px) {
    width: 420px;
    overflow: hidden;
    display: none;
    ${(props) =>
      props.open &&
      css`
        display: flex;
      `};
    ${(props) =>
      !props.open &&
      css`
        display: none;
      `};
  }
`;
export default Chat;
