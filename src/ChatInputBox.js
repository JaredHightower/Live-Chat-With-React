import React from 'react';
import { db } from './firebase'

export default function ChatInputBox() {
    return (
        <form onSubmit={event => {
            event.preventDefault();
            const value = event.target.elements[0].value
            return value
        }} className="ChatInputBox">
            <input className="ChatInput" placeholder="Message #general" />
        </form>
    );
}