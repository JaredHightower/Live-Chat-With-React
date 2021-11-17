import React from 'react';
import useCollection from './useCollection';

export default function Nav({ user, logout }) {
    const channels = useCollection('channels')

    return (
        <div className="Nav">
            <div className="User">
                <img
                    className="UserImage"
                    alt="whatever"
                    src={user.photoUrl}
                />
                <div>
                    <div>{user.displayName}</div>
                    <div>
                        <button onClick={logout} className="text-button">log out</button>
                    </div>
                </div>
            </div>
            <nav className="ChannelNav">
                {channels.map((channel) => (
                    <a key={channel.id} href={`/channel/${channel.id}`}># {channel.id}</a>
                ))}
            </nav>
        </div>
    )

}