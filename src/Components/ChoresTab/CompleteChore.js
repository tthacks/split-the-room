import React from 'react';
import $ from 'jquery';
import ProfilePicture from '../SharedComponents/ProfilePicture';

function CompleteChore(props) {

    function celebrate() {
            let data = {
                isDeleted: true,
                name: props.item.name, 
                user: props.item.user,
            }
            $.post('/updatecompletechore', {_id: props.item._id, data: data}, function() {
                let notification = {
                    deleted: false, 
                    target: props.item.user,
                    msg: props.currentUser + " thanked you for " + props.item.name + "!"
                }
                $.post('/newnotification', notification, function() {
                    props.triggerRefresh();
                });
            });
        }

        if(props.item.isDeleted === null || props.item.isDeleted === "true") {
            return null;
        }
        else {
            return(
            <div className="completedChore" key={props._id}>
            <ProfilePicture user={props.item.user} />
            <p>{props.item.user + " completed: " + props.item.name}</p>
            <button onClick={celebrate}>🎉</button>
    </div>);
        }
}

export default CompleteChore;