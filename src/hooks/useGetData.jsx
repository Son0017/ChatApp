import { dataContext } from "../context/dataContext";
import { userContext } from "../context/userContext";
import { db, collection, onSnapshot } from "../firebase/useFirebaseConfig";

function useGetData() {
  const { dispatch } = userContext();
  const { dispatch: dataDispatch, newMessage } = dataContext();
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

  return { getRooms, getMessage };
}

export default useGetData;
