import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

function EditPetPeevesModal(props) {

    const petPeeves = props.petPeeves;
    const user = props.user;

    function dismissModal(e) {
        props.dismissModal();
    }

    function petPeeveHandler(e) {
        let green = petPeeves.pop();
        let yellow = petPeeves.pop();
        let red = petPeeves.pop();
        if (user === "red") {
            petPeeves.push(e.target.value);
            petPeeves.push(yellow);
            petPeeves.push(green);
        }
        else if (user === "yellow") {
            petPeeves.push(red);
            petPeeves.push(e.target.value);
            petPeeves.push(green);
        }
        else {
            petPeeves.push(red);
            petPeeves.push(yellow);
            petPeeves.push(e.target.value);
        }
        props.editPeeves(petPeeves);
    }

    function submit() {
        let newPeeve = "";
        if (user === "red") {
            newPeeve = petPeeves[0];
        }
        else if (user === "yellow") {
            newPeeve = petPeeves[1];
        }
        else {
            newPeeve = petPeeves[2];
        }

        if (newPeeve === "") {
            alert("No new pet peeves were set.");
        }
        else {
            alert("New pet peeves were set.");
        }
        dismissModal();
        console.log(petPeeves);
    }

    return(
        <div>
            {props.showModal && <div className="modal" id="petPeeveModal">
                <div className="modal-content">
                    <h3 onClick={dismissModal}>X</h3>
                        <h2>Edit Pet Peeves</h2>
                        <textarea onChange={petPeeveHandler} style={{fontFamily: "arial", fontSize: 23}} placeholder="Type your pet peeves here..."></textarea>
                        <div style={{display: "flex", justifyContent: "center", paddingTop: 25}}>
                            <button onClick={submit} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}>SUBMIT</button>
                        </div>
                </div>
            </div>}
        </div>
    );
}

export default EditPetPeevesModal;