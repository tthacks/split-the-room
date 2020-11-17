import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

function NewRoommateModal(props) {

    const [isAdmin, setAdmin] = useState(false);
    const [username, setUsername] = useState("");
    const validUsernames = props.usernames;
    // const listedRoommates = props.listedRoommates;

    function dismissModal() {
        props.dismissModal();
    }

    function isAdminHandler() {
        setAdmin(!isAdmin);
    }

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function add() {
        let newRoommate = {
            username: username,
            admin: isAdmin,
        }
        if (newRoommate.username === "") {
            alert("Please include a username to add.");
        }
        else if (!validUsernames.includes(username)) {
            alert("Please include a valid username to add.");
        }
        else {
            alert("Valid");
        }
        // else if invalid user, aka user is not in recorded list of users
        /*
        else if () {
            alert("Please include a valid username to add.");
        }
        */
        // else {
        //     $.post('/newRoommate', newRommate, function () {
        //         //setRoommate
        //         setAdmin(false);
        //         dismissModal();
        //     });
        // }
    }
    
    return (
        <div>
            {props.showModal && <div class="modal" id="roommateModal">
            <div class="modal-content">
            <h3 onClick={dismissModal}>X</h3>
                <h2>Find User</h2>
                <textarea onChange={usernameHandler} placeholder="Type new roommate's username here..."></textarea>
                <div class="check-admin">
                Mark admin
                <input type="checkbox" onChange={isAdminHandler}></input> 
                </div>
                <button onClick={add}>Add roommate</button>
            </div>
            </div>}
        </div>
    );

    
}

export default NewRoommateModal;