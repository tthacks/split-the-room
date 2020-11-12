import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors'
import NewFinanceModal from './NewFinanceModal';
import TransactionHistoryElement from './TransactionHistoryElement';
import UserChargeView from './UserChargeView';

function FinanceTab(props) {
    const [modalVisible, toggleVisiblity] = useState(false);
    const [chargeView, setChargeView] = useState([]);
    const [transactionList, setTransactionList] = useState([]);
    
    const userList = ['red', 'yellow', 'green', 'house'];
    const outstandingDebt = [0, 0, 0, 0];

    useEffect(fetchTransactionHistory, [props.refreshCounter]);

    function fetchTransactionHistory() {
        $.get('/fetchfinances')
      .done(function (obj) {
        console.log(obj.data);
        if(obj === undefined || obj.data === undefined){
            console.log("fail");
        } 
        else {
          transactionHistory(obj.data);
        }
    })
      .fail(function (obj) {
        console.log(obj.responseText);
      });
    }

    //FORMAT: user1 owes user2 value 
    const history = [{user1: 'yellow', user2: 'red', value: 3.00, isComplete: false, dateCompleted: ""},
    {user1: 'red', user2: 'green', value: 50.00, isComplete: false, dateCompleted: ""},
    {user1: 'yellow', user2: 'green', value: 30.00, isComplete: false, dateCompleted: ""},
    {user1: 'red', user2: 'green', value: 50.00, isComplete: true, dateCompleted: "11/20/2020"},
    {user1: 'green', user2: 'red', value: 10.00, isComplete: true, dateCompleted: "11/15/2020"},
    {user1: 'yellow', user2: 'green', value: 20.00, isComplete: true, dateCompleted: "11/12/2020"}];

    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function setHouseDebts() {
        const debt_list = [];
        for(let x = 0; x < userList.length; x++) {
            debt_list.push({user: userList[x], value: outstandingDebt[x]})
        }
        setChargeView(debt_list.map(function(d) {
            return <UserChargeView currentUser={props.user} user={d.user} value={d.value}/>;
        }));
    }

    function transactionHistory(history) {
        let t = [];
        if(history === undefined || history === null) {
            return; 
        }
        for(let i = 0; i < history.length; i++) {
            //filter out the ones that don't pertain to us
            let h = history[i];
            if(h.user1 === props.user) { //we owe user2 money
                if(h.isComplete) { //this is a history element
                    t.push(<TransactionHistoryElement user={h.user2} value={0-h.value} dateCompleted={h.dateCompleted}/>);
                }
                else { //still an outstanding debt
                    outstandingDebt[userList.indexOf(h.user2)] = outstandingDebt[userList.indexOf(h.user2)] - h.value;
                }
            }
            else if(h.user2 === props.user) { //user1 owes us money
                if(h.isComplete) {
                t.push(<TransactionHistoryElement user={h.user2} value={h.value} dateCompleted={h.dateCompleted}/>);
                }
                else { //still an outstanding debt
                    outstandingDebt[userList.indexOf(h.user1)] = outstandingDebt[userList.indexOf(h.user1)] + h.value;
                }
            }
        }
        setHouseDebts();
        setTransactionList(t);
    }

    function showModal() {
        toggleVisiblity(!modalVisible);
      }

    return(
        <div style={pageStyle}>
            <div style={{marginLeft: "30%", marginRight: "30%", display: "flex", justifyContent: "space-evenly"}}>
                {chargeView}
            </div>
        <div>
            <h2 style={{color: colors.dark4}}>Transaction History</h2>
            {transactionList}
        </div>
    
      <div style={{backgroundColor:colors.dark2, padding: 5}}>
          <div onClick={showModal} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
              <p style={{color: colors.light3, padding: 5}}>NEW CHARGE</p>
          </div>
      </div>
      <NewFinanceModal user={props.user} userList={userList} showModal={modalVisible} dismissModal={showModal} refreshFinances={props.triggerRefresh}/>
      </div>
    );
}

export default FinanceTab;