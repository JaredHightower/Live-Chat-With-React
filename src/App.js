import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Channel from "./Channel";
import { db } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  onAuthStateChanged,
  signOut,
}
  from "firebase/auth";

export default function App() {
  const user = useAuth();

  const handleLogout = async () => {
    const auth = getAuth();
    await signOut(auth)
  }


  return user ? (
    <div className="App">
      <Nav user={user} logout={handleLogout} />
      <Channel />
    </div>
  ) : (
    <LogIn />
  )
}

const LogIn = () => {
  const [authError, setAuthError] = useState(null)
  const handleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      setAuthError(error)
    }
  }
  return (
    <div className="login">
      <h1>Firebase Chat Application!</h1>
      <button onClick={handleSignIn}>Sign In With Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem.</p>
          <p><i>{authError.message}</i></p>
          <p>Please try again later</p>
        </div>
      )}
    </div>
  )
}

const useAuth = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        }
        setUser(user)
        const collectionRef = collection(db, `users`)
        const collectionDocs = doc(collectionRef, user.uid)
        setDoc(collectionDocs, user)
      } else {
        setUser(null)
      }
    });
    return auth;
  }, [])
  return user
}
