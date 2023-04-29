import { Timestamp } from "firebase/firestore";
import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineSend, BsEmojiSmile } from "react-icons/all";
import useRequst from "../hooks/useRequst";
import { userContext } from "../context/userContext";
import useGetData from "../hooks/useGetData";

function SendMessage({ user }) {
  const [inputVal, setInputVal] = useState("");
  const { addRoom, setMessageToRoom } = useRequst();
  const { addNewMes } = useGetData();
  const { currentUser, dispatch } = userContext();
  const handleSubmit = (e) => {
    e.preventDefault();
    setInputVal("");
    if (inputVal.trim().length > 0) {
      if (currentUser.x) {
        setMessageToRoom(currentUser.x, {
          message: inputVal,
          time: {
            seconds: new Date().getTime(),
            getMonth: new Date().getMonth(),
            getHour: new Date().getHours(),
            getMinut: new Date().getMinutes(),
            getDat: new Date().getDate(),
            getYear: new Date().getFullYear(),
          },
          from: user.nickname,
          newMes: true,
        });
        console.log(currentUser);
        addNewMes(user.email, currentUser.email, {
          message: inputVal,
          time: {
            seconds: new Date().getTime(),
            getMonth: new Date().getMonth(),
            getHour: new Date().getHours(),
            getMinut: new Date().getMinutes(),
            getDat: new Date().getDate(),
            getYear: new Date().getFullYear(),
          },
          from: user.nickname,
          newMes: true,
          number: 1,
        });
      } else {
        let x = `${user.nickname}${currentUser.nickname}`;
        addRoom(currentUser, user, {
          message: inputVal,
          time: {
            seconds: new Date().getTime(),
            getMonth: new Date().getMonth(),
            getHour: new Date().getHours(),
            getMinut: new Date().getMinutes(),
            getDat: new Date().getDate(),
            getYear: new Date().getFullYear(),
          },
          from: user.nickname,
          newMes: true,
          number: 1,
        });

        setMessageToRoom(x, {
          message: inputVal,
          time: {
            seconds: new Date().getTime(),
            getMonth: new Date().getMonth(),
            getHour: new Date().getHours(),
            getMinut: new Date().getMinutes(),
            getDat: new Date().getDate(),
          },
          from: user.nickname,
          newMes: false,
        });
        dispatch({ type: "CURRENT_USER", payload: { ...currentUser, x } });
      }
    }
  };
  return (
    <SendMessageStyle onSubmit={handleSubmit}>
      <BsEmojiSmile style={{ cursor: "pointer", fontSize: "25px" }} />
      <label>
        <input
          type="text"
          onChange={(e) => {
            setInputVal(e.target.value);
          }}
          value={inputVal}
        />
      </label>
      <button>
        <AiOutlineSend style={{ cursor: "pointer", fontSize: "25px" }} />
      </button>
    </SendMessageStyle>
  );
}

const SendMessageStyle = styled.form`
  padding: 10px 35px;
  background: #f8f3f3;
  display: flex;
  align-items: center;
  gap: 30px;
  label {
    flex-grow: 1;
    background: white;
    padding: 15px 25px;
    border-radius: 25px;
  }
  input {
    flex-grow: 1;
    font-size: 15px;
    background: inherit;
    border: none;
    &:focus {
      outline: none;
    }
  }
  button {
    background: none;
    border: none;
    outline: none;
  }
  @media only screen and (max-width: 650px) {
    padding: 10px 15px;
    gap: 20px;
    label {
      flex-grow: 1;
      background: white;
      padding: 10px 14px;
      border-radius: 25px;
    }
  }
  @media only screen and (max-width: 320px) {
    padding: 3px 7px;
    gap: 10px;
    label {
      flex-grow: 1;
      background: white;
      padding: 6px 10px;
      border-radius: 25px;
    }
  }
`;

export default SendMessage;
