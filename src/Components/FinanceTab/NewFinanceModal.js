import React, {useEffect, useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

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
            return <div>
                {m}
                <input type="checkbox" id={m} onChange={addToCheckedList}></input>
            </div>
            }
        }));
    }

return(
    <div>
        {props.showModal && <div className="modal" id="financeModal">
        <div className="modal-content">
        <h3 onClick={dismissModal}>X</h3>
            <h2>{"New Charge"}</h2>
            {"Charge Amount "}
            <input type="text" placeholder="charge amount" onChange={chargeHandler}></input>
            <br></br>
            {"Memo "}
            <input type="text" placeholder="comment" onChange={memoHandler}></input><br></br>
            {"Charge "}
            {checkboxes}
            <br></br>
            {"Pay by:"}
        <input type="date" min="2020-01-01"></input>
        <br></br>
            <button onClick={submit}>Submit</button>
        </div>
        </div>}
    </div>
);
}

export default NewFinanceModal;