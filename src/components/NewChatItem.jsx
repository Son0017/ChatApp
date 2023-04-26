import React from "react";
import { useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";
import { BsSearch, ImMenu2 } from "react-icons/all";
import useRequst from "../hooks/useRequst";
import ListChat from "./ListChat";
import { userContext } from "../context/userContext";
import { useAuth0 } from "@auth0/auth0-react";

function NewChatItem({ close }) {
  const [inputVal, setInputVal] = useState("");
  const { getUser } = useRequst();
  const { users } = userContext();
  const { user } = useAuth0();
  const [data, setData] = useState(null);
  useEffect(() => {
    getUser();
  }, []);
  useEffect(() => {
    if (users && inputVal.trim().length > 0) {
      let newArray = users.filter((item) => {
        return (
          item.email.includes(inputVal.trim()) &&
          !item.email.includes(user.email)
        );
      });
      setData(newArray);
    } else {
      setData(null);
    }
  }, [inputVal]);

  return (
    <NewChat close={close}>
      <div style={{ background: "blue", padding: "30px 15px" }}>
        <h3>New Chat</h3>
      </div>
      <FormStyle>
        <label>
          <BsSearch style={{ cursor: "pointer" }} />
          <input
            type="text"
            onChange={(e) => {
              setInputVal(e.target.value);
            }}
            value={inputVal}
          />
        </label>
        <ImMenu2 style={{ fontSize: "25px", cursor: "pointer" }} />
      </FormStyle>
      <ListChat data={data} />
    </NewChat>
  );
}
const NewChat = styled.div`
  position: absolute;
  top: 0;
  height: 100vh;
  background: white;
  width: 420px;
  @media only screen and (max-width: 950px) {
    width: 320px;
  }
  transform: translate(-420px);
  transition: all 0.5s;
  ${(props) =>
    props.close &&
    css`
      transform: translate(0);
    `};
`;

const FormStyle = styled.form`
  padding: 7px 15px;
  display: flex;
  align-items: center;
  gap: 15px;
  border-bottom: 1px solid #dfdada;
  label {
    padding: 9px 15px;
    flex-grow: 1;
    background: #f8f3f3;
    display: flex;
    align-items: center;
    gap: 30px;
    border-radius: 10px;
  }
  input {
    flex-grow: 1;
    border: none;
    font-size: 17px;
    background: inherit;
    &:hover {
      border: none;
    }
    &:active {
      border: none;
    }
    &:focus {
      border: none;
      outline: none;
    }
  }
`;
export default NewChatItem;
