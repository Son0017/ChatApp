import { useAuth0 } from "@auth0/auth0-react";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import useGetData from "../hooks/useGetData";
import { userContext } from "../context/userContext";
import { dataContext } from "../context/dataContext";

function MessageList() {
  const { user } = useAuth0();
  const { getMessage } = useGetData();
  const { currentUser } = userContext();
  const { messageData: message } = dataContext();

  useEffect(() => {
    getMessage(currentUser.x);
  }, [currentUser]);
  return (
    <MessageListStyle>
      {message &&
        message.map((item) => {
          if (item.from === user.nickname) {
            return (
              <li className="user" key={Math.random()}>
                <div>
                  <span>{item.message}</span>
                  <span className="clock">
                    {item.time.getHour}:
                    {item.time.getMinut < 10
                      ? `0${item.time.getMinut}`
                      : item.time.getMinut}
                  </span>
                </div>
              </li>
            );
          } else {
            return (
              <li className="user2" key={Math.random()}>
                <div className="div">
                  <span>{item.message}</span>
                  <span className="clock">
                    {item.time.getHour}:
                    {item.time.getMinut < 10
                      ? `0${item.time.getMinut}`
                      : item.time.getMinut}
                  </span>
                </div>
              </li>
            );
          }
        })}
    </MessageListStyle>
  );
}

const MessageListStyle = styled.div`
  overflow-y: auto;
  list-style: none;
  padding: 15px 95px;
  flex-grow: 1;
  display: flex;
  flex-direction: column-reverse;
  span {
    display: block;
  }
  .clock {
    font-size: 10px;
    text-align: end;
    margin-top: 5px;
    font-family: Cambria, Cochin, Georgia, Times, "Times New Roman", serif;
    letter-spacing: 1px;
  }
  div {
    border-radius: 5px;
    justify-content: space-between;
    background-color: #69db69ac;
    display: inline-block;
    padding: 5px 7px;
    padding-bottom: 15px;
    min-width: 100px;
    clip-path: polygon(
      0% 0%,
      100% 0%,
      100% 75%,
      100% 75%,
      100% 100%,
      75% 75%,
      0 75%
    );
  }
  .div {
    clip-path: polygon(0 0, 42% 0, 100% 0, 100% 75%, 25% 76%, 0 100%, 0 75%);
  }
  .user {
    display: flex;
    justify-content: flex-end;
  }
  .user2 {
    display: flex;
    justify-content: flex-start;
  }
  @media only screen and (max-width: 950px) {
    padding: 15px 25px;
  }
`;

export default MessageList;
