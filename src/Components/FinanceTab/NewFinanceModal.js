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
        console.log(targetUsers.length);
        if(targetUsers.length > 0) {
            let newCharge = {
                user1: targetUsers[0],
                user2: props.user,
                value: charge,
                memo: memo, 
                isComplete: false,
                dateCompleted: ""
            };
        // for(let x = 0; x < targetUsers.length; x++) {
        //     newCharges = [...newCharges, ({
        //         user1: targetUsers[x],
        //         user2: props.user,
        //         value: charge,
        //         memo: memo, 
        //         isComplete: false,
        //         dateCompleted: ""
        //     })];
        // }
        console.log(newCharge);
        $.post('/newcharges', newCharge, function() {
            setMemo("");
            setCharge("");
            // setTargetUsers([]);
            props.refreshFinances();
            dismissModal();
        });
    }
}

    function addToCheckedList(e) {
        if(e.target.checked) {
            targetUsers.push(e.target.id);
            setTargetUsers(targetUsers);
        }
        else {
            let newTarget = [];
            for(let x = 0; x < targetUsers.length; x++) {
                if(targetUsers[x] !== e.target.id) {
                    newTarget.push(targetUsers[x]);
                }
            }  
            targetUsers = newTarget;       
        }
        console.log(targetUsers);
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