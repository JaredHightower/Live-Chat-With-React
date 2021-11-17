import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = initializeApp({
  apiKey: "AIzaSyAbBTNXgod0UkTMsgIxjupgfBk3YFYQ8jk",
  authDomain: "chat-app-66901-dev.firebaseapp.com",
  databaseURL: "https://chat-app-66901-dev-default-rtdb.firebaseio.com",
  projectId: "chat-app-66901-dev",
  storageBucket: "chat-app-66901-dev.appspot.com",
  messagingSenderId: "556943717887",
  appId: "1:556943717887:web:4be09fd9ccb6425cade3ca",
});

const db = getFirestore(firebaseConfig);



export { db }