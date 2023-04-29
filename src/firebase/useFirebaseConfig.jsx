// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  collection,
  addDoc,
  getFirestore,
  setDoc,
  updateDoc,
  doc,
  query,
  where,
  getDoc,
  onSnapshot,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBS5UK49w7OmOzrHKQwySMNfXnBy_vNEu8",
  authDomain: "chat-743a7.firebaseapp.com",
  projectId: "chat-743a7",
  storageBucket: "chat-743a7.appspot.com",
  messagingSenderId: "970723640232",
  appId: "1:970723640232:web:982a0349ef6b2019de139d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {
  db,
  collection,
  addDoc,
  setDoc,
  updateDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  where,
};
