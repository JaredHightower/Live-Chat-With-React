import React, { useState, useEffect } from 'react';
import { db, collection, onSnapshot } from './firebase';

export default function Nav() {
    const [channels, setChannels] = useState([]);

    useEffect(
        () =>
            onSnapshot(collection(db, "channels"), (snapshot) => {
                setChannels(
                    snapshot.docs.map((doc) => ({
                        ...doc.data(),
                        id: doc.id,
                    }))
                );
            }),
        []
    );

    return (
        <div className="Nav">
            <div className="User">
                <img
                    className="UserImage"
                    alt="whatever"
                    src="https://placekitten.com/64/64"
                />
                <div>
                    <div>Jared Hightower</div>
                    <div>
                        <button className="text-button">log out</button>
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