import React from "react";
import styled from "styled-components";
// import { AiOutlineCheck } from "react-icons/all";
import { userContext } from "../context/userContext";
// import { dataContext } from "../context/dataContext";
function ListChat({ data, setOpen }) {
  const { dispatch } = userContext();
  let newMes;
  // console.log(data);
  return (
    <ListChatStyle>
      {data &&
        data.map((item) => {
          return (
            <li
              key={item.email}
              onClick={() => {
                dispatch({ type: "CURRENT_USER", payload: { ...item } });
                setOpen(true);
              }}
            >
              <div className="img">
                <img width={60} height={60} src={item.picture} alt="" />
              </div>
              <div className="userName">
                <div>
                  <h3>{item.name}</h3>
                  {!newMes && <p>{item.email}</p>}
                  {newMes && (
                    <p style={{ color: "blue" }}>
                      {newMes.length > 0
                        ? newMes[newMes.length - 1].message
                        : data[data.length - 1].message}
                    </p>
                  )}
                </div>
                <span></span>
              </div>
            </li>
          );
        })}
    </ListChatStyle>
  );
}

const ListChatStyle = styled.ul`
  list-style: none;
  img {
    border-radius: 50%;
  }
  .img {
    padding: 10px;
  }
  li {
    display: flex;
    gap: 15px;
    cursor: pointer;
    &:hover {
      background: #f8f3f3;
    }
  }
  .userName {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 7px;
    padding-right: 15px;
    border-bottom: 1px solid #dfdada;
    flex-grow: 1;
    font-size: 17px;
  }
  h3 {
    font-weight: 300;
    margin-bottom: 7px;
  }
  p {
    font-size: 15px;
  }
  span {
    font-size: 11px;
  }
  @media only screen and (max-width: 950px) {
    img {
      width: 50px;
      height: 50px;
    }
  }
`;
export default ListChat;
