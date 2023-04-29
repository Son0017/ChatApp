import { createContext, useContext, useReducer } from "react";

const UserContexts = createContext();

let initializeState = {
  users: null,
  currentUser: null,
  isPending: false,
  error: null,
  close: false,
  rooms: null,
  message: null,
};

function filter(array) {
  let newArray;
  if (array.length > 0 && array) {
    if (array.length > 1) {
      newArray = array.sort(
        (a, b) => b.newMes.time.seconds - a.newMes.time.seconds
      );
    } else {
      newArray = [...array];
    }
  }
  return array;
}

let reducer = (state, action) => {
  switch (action.type) {
    case "USERS":
      return { ...state, users: action.payload };
    case "CLOSE":
      return { ...state, close: action.payload };
    case "CURRENT_USER":
      return { ...state, currentUser: action.payload, close: false };
    case "ROOMS":
      return { ...state, rooms: filter(action.payload) };
    default:
      return { ...state };
  }
};

const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initializeState);

  return (
    <UserContexts.Provider value={{ ...state, dispatch }}>
      {children}
    </UserContexts.Provider>
  );
};

function userContext() {
  return useContext(UserContexts);
}

export { userContext, UserProvider };
