import React, { useEffect } from 'react';
import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Message from './Message';
import ChatInputBox from './ChatInputBox';
import { db } from './firebase';
import { doc, updateDoc } from '@firebase/firestore';


export default function Channel({ user, channelId }) {
    useEffect(() => {
        const makeAnUpdate = async () => {
            const docRef = doc(db, `users/${user.uid}`);
            await updateDoc(docRef, {
                [`channels.${channelId}`]: true
            })
        }
        return async () => await makeAnUpdate()
    }, [user.uid, channelId])



    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo channelId={channelId} />
                <Message channelId={channelId} />
                <ChatInputBox channelId={channelId} user={user} />
            </div>
            <Members channelId={channelId} />
        </div>
    );
}