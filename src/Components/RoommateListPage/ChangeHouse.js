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
        dismissModal();
    }
    
    return (
        <div>
            {props.showModal && <div class="modal" id="houseNameModal">
            <div class="modal-content">
            <h3 onClick={dismissModal}>X</h3>
                <h2>Change House Name</h2>
                <textarea onChange={nameHandler} style={{fontFamily: "arial", fontSize: 23}} placeholder="Type new house name here..."></textarea>
                <div style={{display: "flex", justifyContent: "center", paddingTop: 25}}>
                    <button onClick={changeName} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}>CHANGE NAME</button>
                </div>
            </div>
            </div>}
        </div>
    );

    
}

export default ChangeHouse;