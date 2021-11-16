import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot, query, orderBy } from './firebase';

export default function Message() {
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const checkMessageIdx = async () => {
            const collectionRef = collection(db, 'channels/general/messages')
            const q = query(collectionRef, orderBy('createdAt'))
            await onSnapshot(q, (snapShot) => {
                setMessages(
                    snapShot.docs.map(doc => ({
                        ...doc.data(),
                        id: doc.id
                    }))
                )
            });

        }
        checkMessageIdx()
    }, []);

    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {messages.map((message, index) => {
                return index === 0 ? (
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
                                <div className="MessageContent">{message.text}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div>
                        <div className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}