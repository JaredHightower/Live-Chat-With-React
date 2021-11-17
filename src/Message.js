import React from 'react';
import useCollection from './useCollection';

export default function Message() {
    const messages = useCollection('channels/general/messages', 'createdAt')

    return (
        <div className="Messages">
            <div className="EndOfMessages">That's every message!</div>
            {messages.map((message, index) => {
                return index === 0 ? (
                    <div key={message.id}>
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