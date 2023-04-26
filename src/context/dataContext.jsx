import { useAuth0 } from "@auth0/auth0-react";
import { createContext, useContext, useReducer, useState } from "react";

const DataContaxt = createContext();

const initialState = {
  messageData: null,
  filterMessage: null,

  isPending: false,
  error: null,
};

function filter(array) {
  let newArray;
  if (array.length > 0 && array) {
    newArray = array.sort((a, b) => b.time.seconds - a.time.seconds);
  }
  return newArray;
}

const reducer = (state, action) => {
  switch (action.type) {
    case "MESSAGE":
      return {
        ...state,
        messageData: filter(action.payload),
      };
    case "NEWMESSAGE":
      return {
        ...state,
        newMessage: filter(action.payload),
      };
    case "LOSTMESSAGE":
      return {
        ...state,
        lostMessage: action.payload,
      };
    default:
      return { ...state };
  }
};

const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContaxt.Provider value={{ ...state, dispatch }}>
      {children}
    </DataContaxt.Provider>
  );
};

function dataContext() {
  return useContext(DataContaxt);
}

export { dataContext, DataProvider };
