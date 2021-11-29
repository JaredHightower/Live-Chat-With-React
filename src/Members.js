import useCollection from './useCollection';

import React from 'react';
export default function Members({ channelId }) {
    const members = useCollection(
        'users',
        'displayName',
        [`channels.${channelId}`, '==', true]
    );

    return (
        <div className="Members">
            <div>
                {members.map(member => (
                    <div key={member.id} className="Member">
                        <div className={`MemberStatus ${member.status.state}`} />
                        {member.displayName}
                    </div>
                ))}
            </div>
        </div>
    )
}