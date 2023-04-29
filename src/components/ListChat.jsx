import React from "react";
import styled from "styled-components";
import { userContext } from "../context/userContext";
function ListChat({ data, setOpen }) {
  const { dispatch, rooms } = userContext();

  return (
    <ListChatStyle>
      {data &&
        data.map((item) => {
          return (
            <li
              key={item.email}
              onClick={() => {
                if (rooms) {
                  if (rooms.length !== 0) {
                    rooms.map((item2) => {
                      if (item.email === item2.email) {
                        dispatch({
                          type: "CURRENT_USER",
                          payload: { ...item2 },
                        });
                      } else {
                        dispatch({
                          type: "CURRENT_USER",
                          payload: { ...item },
                        });
                      }
                    });
                  } else {
                    dispatch({ type: "CURRENT_USER", payload: { ...item } });
                  }
                } else {
                  dispatch({ type: "CURRENT_USER", payload: { ...item } });
                }
                setOpen(true);
              }}
            >
              <div className="img">
                <img width={60} height={60} src={item.picture} alt="" />
              </div>
              <div className="userName">
                <div>
                  <h3>{item.name}</h3>
                  {!item.newMes && <p>{item.email}</p>}
                  {item.newMes && (
                    <p style={{ color: "blue" }}>{item.newMes.message}</p>
                  )}
                </div>
                {item.newMes && item.newMes.number > 0 && (
                  <span style={{ color: "blue", fontSize: "15px" }}>
                    {item.newMes.number}
                  </span>
                )}
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
