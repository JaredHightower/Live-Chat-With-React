import React, { useState, useEffect } from "react";
import Nav from "./Nav";
import Channel from "./Channel";
import { db, setUpPresence } from "./firebase";
import { collection, doc, setDoc } from "firebase/firestore";
import { Redirect, Router } from '@reach/router';
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
      <Router>
        <Redirect from="/" to="channel/general" />
        <Channel path="channel/:channelId" user={user} />
      </Router>
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
  const auth = getAuth();

  useEffect(() => {
    return onAuthStateChanged(auth, firebaseUser => {
      if (firebaseUser) {
        const user = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid
        }
        const getUser = async () => {
          const collectionDocs = doc(collection(db, 'users'), user.uid)
          await setDoc(collectionDocs, user, { merge: true })
          setUpPresence(user)
          setUser(user)
        }
        getUser()
      } else {
        setUser(null);
      }
    });
  }, [auth])
  return user
}