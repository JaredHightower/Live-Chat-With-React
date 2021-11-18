import React, { useState, useEffect } from 'react';
import useCollection from './useCollection';
import { db } from './firebase'
import { doc, getDoc } from 'firebase/firestore'
export default function Message({ channelId }) {
    const messages = useCollection(`channels/${channelId}/messages`, 'createdAt')

    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>

            {messages.map((message, index) => {
                const previous = messages[index - 1]
                const showDay = false
                const showAvatar = !previous || message.user.id !== previous
                return showAvatar ? (
                    <FirstMessageFromUser
                        key={message.id}
                        message={message}
                        showDay={showDay}
                    />
                ) : (

                    <div key={message.id}>
                        <div className="Message no-avatar">
                            <div className="MessageContent">{message.text}</div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}
const cache = {};
const pendingCache = {};

const useDoc = (path) => {
    const [docs, setDocs] = useState(cache[path]);

    useEffect(() => {
        if (docs) return;
        let stillMounted = true;
        const getFirebaseDocs = async () => {
            const docSnap = await getDoc(doc(db, path));
            const pending = pendingCache[path];
            const promise = pending || (pendingCache[path] = docSnap);
            if (stillMounted) {
                const user = {
                    ...promise.data(),
                    id: promise.id
                }
                setDocs(user)
                cache[path] = user
            }
            return () => {
                stillMounted = false;
            }

        }
        return getFirebaseDocs();
    }, [docs, path])

    return docs
}

const FirstMessageFromUser = ({ message, showDay }) => {
    const author = useDoc(message.user.path)
    return (
        <div key={message.id}>
            {showDay && (
                <div className="Day">
                    <div className="DayLine" />
                    <div className="DayText">5/6/2021</div>
                    <div className="DayLine" />
                </div>
            )}
            <div className="Message with-avatar">
                <div className="Avatar"
                    style={{ backgroundImage: author ? `url("${author.photoUrl}")` : '' }}
                />
                <div className="Author">
                    <div>
                        <span className="UserName">{author && author.displayName}</span>
                        {" "}
                        <span className="TimeStamp">3:37 PM</span>
                    </div>
                    <div className="MessageContent">{message.text}</div>
                </div>
            </div>
        </div>
    )
}