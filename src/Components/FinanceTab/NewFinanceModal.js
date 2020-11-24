import React, {useEffect, useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';
import * as colors from '../../colors'

function NewFinanceModal(props) {

    const [charge, setCharge] = useState(0.00);
    const [memo, setMemo] = useState("");
    const [checkboxes, setChargeCheckboxes] = useState([]);
    const [targetUsers, setTargetUsers] = useState([]);

    useEffect(chargeCheckboxes, [props.userList]);

    function dismissModal(e) {
        props.dismissModal();
    }

    function chargeHandler(e) {
        setCharge(e.target.value);
    }

    function memoHandler(e) {
        setMemo(e.target.value);
    }

    function submit() {
        for(let x = 0; x < targetUsers.length; x++) {
            let newCharge = {
                user1: targetUsers[x],
                user2: props.user,
                value: charge,
                memo: memo, 
                isComplete: false,
                dateCompleted: new Date().toDateString()
            };
            $.post('/newcharges', newCharge);
        }
            setMemo("");
            setCharge("");
            setTargetUsers([]);
            props.refreshFinances();
            dismissModal();
    }

    function addToCheckedList(e) {
        if(e.target.checked) {
            targetUsers.push(e.target.id);
            setTargetUsers(targetUsers);
        }
        else {
            let idx = targetUsers.indexOf(e.target.id);
            if(idx > -1) {
            targetUsers.splice(idx, 1);
            }
            setTargetUsers(targetUsers);
        }
    }

    function chargeCheckboxes() {
        setChargeCheckboxes(props.userList.map(function(m) {
            if(m === props.user) {
                return <></>;
            }
            else {
            return <ul>
                <text style={{float: "left"}}>{m}</text>
                <input type="checkbox" id={m} onChange={addToCheckedList} style={{width: 20, height: 20}}></input>
            </ul>
            }
        }));
    }

return(
    <div>
        {props.showModal && <div className="modal" id="financeModal">
        <div className="modal-content">
        <h3 onClick={dismissModal}>X</h3>
            <h2>{"New Charge"}</h2>
                <div style={{paddingLeft: "10%"}}>
                    <div className="modal-input">
                        <text style={{paddingRight: "10%"}}>Charge Amount</text>
                        <input type="text" placeholder="charge amount" onChange={chargeHandler}></input>
                    </div>
                    <br></br>
                    <div className="modal-input">
                        <text style={{paddingRight: "19%"}}>Memo </text>
                        <input type="text" placeholder="comment" onChange={memoHandler}></input>
                    </div>
                    <br></br>
                    <div className="modal-input">
                        <text style={{float: "left"}}>Charge</text>
                        {checkboxes}
                    </div>
                    <br></br>
                    <text style={{paddingRight: "18%"}}>Pay by: </text>
                    <input type="date" min="2020-01-01"></input>
                </div>
            <div style={{display: "flex", justifyContent: "center", paddingTop: 25}}>
                <button onClick={submit} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}>SUBMIT</button>
            </div>
        </div>
        </div>}
    </div>
);
}

export default NewFinanceModal;