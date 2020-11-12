import React, {useEffect, useState} from "react";
import $ from 'jquery';
import '../Stylesheets/modal.css';

function NewFinanceModal(props) {

    const [charge, setCharge] = useState(0.00);
    const [memo, setMemo] = useState("");
    const [userList, setUserList] = useState([]);
    const [checkedUserList, updateCheckedUserList] = useState([]);

    useEffect(getUserList, [props.refreshFinances]);


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
        let newCharge = {
            author: props.user,
            amount: charge,
            memo: memo,
        };
        if (newCharge.msg === "") {
            alert("Please include content in your message.");
        }
        else {
            $.post('/newcharge', newCharge, function() {
                //reset modal 
                props.refreshFinances();
                dismissModal();
            });
        }
    }

    function getUserList() {
        $.get('/fetchuserlist')
        .done(function (obj) {
          console.log(obj.data);
          if(obj === undefined || obj.data === undefined){
              console.log("fail");
          } 
          else {
          setUserList(obj.data.map(function(m) {
              return(m.user);
          }));
      }
        })
        .fail(function (obj) {
          console.log(obj.responseText);
        });
      }

    function chargeCheckboxes() {
        userList.map(function(m) {
            return(<div>
                <input type="checkbox"></input>
                {m}
            </div>);
        });
    }

return(
    <div>
        {props.showModal && <div class="modal" id="financeModal">
        <div class="modal-content">
        <h3 onClick={dismissModal}>X</h3>
            <h2>{"New Charge"}</h2>
            <input type="text" placeholder="charge amount" onChange={chargeHandler}></input>
            <input type="text" placeholder="comment" onChange={memoHandler}></input>
            {chargeCheckboxes()}
            <br></br>
            {"Pay by:"}
        <input type="date" min="2020-01-01"></input>
            <button onClick={submit}>Submit</button>
        </div>
        </div>}
    </div>
);
}

export default NewFinanceModal;