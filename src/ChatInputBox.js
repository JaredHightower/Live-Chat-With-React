import React from 'react';
import { db } from './firebase'
import { collection, addDoc, doc } from "firebase/firestore"

export default function ChatInputBox({ user, channelId }) {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            const value = event.target.elements[0].value
            const addGMToDatabase = async () => {
                const addDataToFirebase = addDoc(collection(db, `channels/${channelId}/messages`), {
                    user: doc(db, 'users', user.uid),
                    text: value,
                    createdAt: new Date()
                })
                return await addDataToFirebase
            }
            addGMToDatabase();
            event.target.reset();
        }} className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
        </form>
    );
}