import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, doc } from "firebase/firestore";

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

function App() {
  const [channels, setChannels] = useState([]);

  useEffect(() => {
    const getCollections = async (db) => {
      const collectionList = collection(db, "channels");
      const collectionSnap = await getDocs(collectionList);
      const snapShotOutput = collectionSnap.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setChannels(snapShotOutput);
      return snapShotOutput;
    };
    getCollections(db);
  }, []);

  return (
    <div className="App">
      <div className="Nav">
        <div className="User">
          <img
            className="UserImage"
            alt="whatever"
            src="https://placekitten.com/64/64"
          />
          <div>
            <div>Jared Hightower</div>
            <div>
              <button className="text-button">log out</button>
            </div>
          </div>
        </div>
        <nav className="ChannelNav">
          {channels.map((channel) => (
            <a href={`/channel/${channel.id}`}># {channel.id}</a>
          ))}
        </nav>
      </div>
      <div className="Channel">
        <div className="ChannelMain">
          <div className="ChannelInfo">
            <div className="Topic">
              Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
          </div>
          <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            <div>
              <div className="Day">
                <div className="DayLine" />
                <div className="DayText">5/6/2021</div>
                <div className="DayLine" />
              </div>
              <div className="Message with-avatar">
                <div className="Avatar" />
                <div className="Author">
                  <div>
                    <span className="UserName">Jared Hightower </span>
                    <span className="TimeStamp">3:37 PM</span>
                  </div>
                  <div className="MessageContent">Alright, lets do this.</div>
                </div>
              </div>
            </div>
            <div>
              <div className="Message no-avatar">
                <div className="MessageContent">works now?</div>
              </div>
            </div>
          </div>
          <div className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
          </div>
        </div>
        <div className="Members">
          <div>
            <div className="Member">
              <div className="MemberStatus offline" />
              Jared Hightower
            </div>
            <div className="Member">
              <div className="MemberStatus online" />
              cleverbot
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
