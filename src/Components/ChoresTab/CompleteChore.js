import React from 'react';
import ProfilePicture from '../SharedComponents/ProfilePicture';

function CompleteChore(props) {

    function celebrate() {
        //TODO
    }

    return(<div className="completedChore">
        <ProfilePicture user={props.user} />
    <p>{props.user + " completed: " + props.name}</p>
    <button onClick={celebrate}>🎉</button>
    </div>);
}

export default CompleteChore;