import styled from "styled-components";
import UserSide from "./components/UserSide";
import Chat from "./components/Chat";
import { useAuth0 } from "@auth0/auth0-react";
import useRequst from "./hooks/useRequst";
import { useEffect, useState } from "react";
import useGetData from "./hooks/useGetData";

function App() {
  const { isAuthenticated, user, loginWithRedirect } = useAuth0();
  const { addUser } = useRequst();
  const { getRooms } = useGetData();
  useEffect(() => {
    if ((isAuthenticated, user)) {
      addUser(user);
      getRooms(user.email);
    }
  }, [isAuthenticated]);
  const [open, setOpen] = useState(false);
  return (
    <>
      {isAuthenticated ? (
        <APP>
          <UserSide open={open} setOpen={setOpen} />
          <Chat open={open} setOpen={setOpen} />
        </APP>
      ) : (
        <Welcome>
          <div>
            <h4>Welcome To Chat</h4>
            <button onClick={loginWithRedirect}>Log In</button>
            <p>You must log in to use the chat</p>
          </div>
        </Welcome>
      )}
    </>
  );
}

const APP = styled.div`
  display: flex;
  height: 100vh;
`;
const Welcome = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: url("https://picsum.photos/seed/picsum/2000/3000");
  background-repeat: no-repeat;
  background-size: cover;
  h4 {
    font-size: 45px;
    margin-bottom: 20px;
  }
  button {
    width: 100%;
    cursor: pointer;
    padding: 20px 0;
    background: #0bd60b;
    border: none;
    border-radius: 5px;
    font-size: 17px;
    color: white;
    margin-bottom: 15px;
  }
  div {
    background: white;
    padding: 15px 30px;
    border-radius: 15px;
  }
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
export default App;
