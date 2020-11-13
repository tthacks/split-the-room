import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

function ChangeHouse(props) {

    const houseName = props.houseName;

    function dismissModal() {
        props.dismissModal();
    }

    function nameHandler(e) {
        props.setHouseName(e.target.value);
    }

    function changeName() {
        let newName = houseName;
        if (newName === "") {
            alert("Please include a name for your house.");
        }
        else {
            alert("New house name is " + newName);
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
            {props.showModal && <div class="modal" id="houseNameModal">
            <div class="modal-content">
            <h3 onClick={dismissModal}>X</h3>
                <h2>Change House Name</h2>
                <textarea onChange={nameHandler} placeholder="Type new house name here..."></textarea>
                <button onClick={changeName}>Change name</button>
            </div>
            </div>}
        </div>
    );

    
}

export default ChangeHouse;