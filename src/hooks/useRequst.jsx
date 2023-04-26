import { userContext } from "../context/userContext";
import {
  db,
  collection,
  addDoc,
  setDoc,
  doc,
  getDoc,
  onSnapshot,
} from "../firebase/useFirebaseConfig";

function useRequst() {
  const { dispatch } = userContext();

  const addUser = async (user) => {
    await setDoc(doc(db, "users", `${user.nickname}`), { ...user });
  };
  const getUser = async () => {
    onSnapshot(collection(db, "users"), (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      dispatch({ type: "USERS", payload: users });
    });
  };

  const addRoom = async (user, authUser) => {
    let x = `${authUser.nickname}${user.nickname}`;
    await setDoc(doc(db, `${user.email}`, `${authUser.email}`), {
      x,
      ...authUser,
    });
    await setDoc(doc(db, `${authUser.email}`, `${user.email}`), { ...user, x });
  };
  const setMessageToRoom = async (id, data) => {
    // console.log(id, "asfd", data);
    await addDoc(collection(db, `${id}`), {
      ...data,
    });
  };
  return { addUser, getUser, setMessageToRoom, addRoom };
}

export default useRequst;
