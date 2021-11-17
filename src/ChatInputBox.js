import React from 'react';
import { db } from './firebase'
import { collection, addDoc } from "firebase/firestore"

export default function ChatInputBox() {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            const value = event.target.elements[0].value
            const addGMToDatabase = async () => {
                const addDataToFirebase = addDoc(collection(db, 'channels/general/messages'), {
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