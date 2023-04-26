import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import SearchForm from "./SearchForm";
import ListChat from "./ListChat";
import styled, { css } from "styled-components";
import NewChatItem from "./NewChatItem";
import { userContext } from "../context/userContext";

function UserSide({ setOpen, open }) {
  const { dispatch, close, rooms } = userContext();

  return (
    <UserSideStyle open={open}>
      <Navbar dispatch={dispatch} />
      <SearchForm />
      <ListChat data={rooms} setOpen={setOpen} />
      <NewChatItem close={close} />
    </UserSideStyle>
  );
}

const UserSideStyle = styled.div`
  width: 420px;
  border-right: 1px solid #dfdada;
  @media only screen and (max-width: 770px) {
    border: none;
    width: 100%;
    ${(props) =>
      props.open &&
      css`
        display: none;
      `};
    ${(props) =>
      !props.open &&
      css`
        display: block;
      `};
  }
`;

export default UserSide;
