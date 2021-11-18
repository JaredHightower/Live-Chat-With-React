import React from 'react';
import useCollection from './useCollection';
import { Link } from '@reach/router';

export default function Nav({ user, logout }) {
    const channels = useCollection('channels')

    return (
        <div className="Nav">
            <div className="User">
                <img
                    className="UserImage"
                    alt="userImg"
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
                    <Link key={channel.id} to={`/channel/${channel.id}`}># {channel.id}</Link>
                ))}
            </nav>
        </div>
    )

}