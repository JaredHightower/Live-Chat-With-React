import React from 'react';
export default function ChannelInfo() {
    return (
        <div className="ChannelInfo">
            <div className="Topic">
                Topic: <input className="TopicInput" value="Awesome stuff" />
            </div>
            <div className="ChannelName">#general</div>
        </div>
    )
}