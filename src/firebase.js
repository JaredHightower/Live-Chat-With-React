import { initializeApp } from "firebase/app";
import { getFirestore, doc, updateDoc, Timestamp } from "firebase/firestore";
import { getDatabase, ref, onValue, onDisconnect, set, serverTimestamp } from "firebase/database";

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

const rtdb = getDatabase()


const setUpPresence = (user) => {
  const connectedRef = ref(rtdb, '.info/connected');
  const rtdbRef = ref(rtdb, `status/${user.uid}`);
  const userDoc = doc(db, `users/${user.uid}`)

  const isOfflineForRTDB = {
    state: "offline",
    lastChanged: serverTimestamp()
  }
  const isOnlineForRTDB = {
    state: "online",
    lastChanged: serverTimestamp()
  }
  const isOfflineForFireStore = {
    state: "offline",
    lastChanged: Timestamp.now()
  }
  const isOnlineForFireStore = {
    state: "online",
    lastChanged: Timestamp.now()
  }

  onValue(connectedRef, async snap => {
    if (snap.val() === false) {
      await updateDoc(userDoc, {
        status: isOfflineForFireStore
      })
      return;
    }

    // is offline
    await onDisconnect(rtdbRef).set(isOfflineForRTDB)

    //is online
    await set(rtdbRef, isOnlineForRTDB)
    await updateDoc(userDoc, {
      status: isOnlineForFireStore
    })

  })

}

export { db, setUpPresence }
