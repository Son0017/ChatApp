import { useEffect } from "react";
import { dataContext } from "../context/dataContext";
import { userContext } from "../context/userContext";
import {
  db,
  collection,
  onSnapshot,
  doc,
  updateDoc,
} from "../firebase/useFirebaseConfig";

function useGetData() {
  const { dispatch } = userContext();
  const { dispatch: dataDispatch } = dataContext();
  const getRooms = (id) => {
    onSnapshot(collection(db, `${id}`), (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      dispatch({ type: "ROOMS", payload: rooms });
    });
  };

  const getMessage = (id) => {
    onSnapshot(collection(db, `${id}`), (querySnapshot) => {
      const rooms = [];
      querySnapshot.forEach((doc) => {
        rooms.push(doc.data());
      });
      dataDispatch({ type: "MESSAGE", payload: rooms });
    });
  };

  const addNewMes = async (user, currentUser, data) => {
    const washingtonRef = doc(db, `${currentUser}`, `${user}`);
    await updateDoc(washingtonRef, {
      newMes: { ...data },
    });
  };
  return { getRooms, getMessage, addNewMes };
}

export default useGetData;
