import React from 'react';
import Members from './Members';
import ChannelInfo from './ChannelInfo';
import Message from './Message';
import ChatInputBox from './ChatInputBox';


export default function Channel() {
    return (
        <div className="Channel">
            <div className="ChannelMain">
                <ChannelInfo />
                <Message />
                <ChatInputBox />
            </div>
            <Members />
        </div>
    );
}