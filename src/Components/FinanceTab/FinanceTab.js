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
    const debugMode = true;
    
    const userList = ['red', 'yellow', 'green', 'house'];
    const outstandingDebt = [0, 0, 0, 0];

    useEffect(fetchTransactionHistory, [props.refreshCounter]);

    function fetchTransactionHistory() {
        $.get('/fetchfinances')
      .done(function (obj) {
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
    
    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function deleteAll() {
        $.post('/deleteallfinances')
        .done(function(obj) {
          fetchTransactionHistory();
        })
      }

    function setHouseDebts() {
        const debt_list = [];
        for(let x = 0; x < userList.length; x++) {
            debt_list.push({key: x, user: userList[x], value: outstandingDebt[x]})
        }
        setChargeView(debt_list.map(function(d) {
            return <UserChargeView key={d._id} currentUser={props.user} user={d.user} value={d.value} triggerRefresh={props.triggerRefresh} pageList={props.pageList} addPage={props.addPage} setClickedUser={props.setClickedUser} setActive={props.setActive} />;
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
                    t.push(<TransactionHistoryElement user={props.user} user1={h.user1} user2={h.user2} memo={h.memo} value={h.value} isComplete={h.isComplete} dateCompleted={h.dateCompleted}/>);
                    outstandingDebt[userList.indexOf(h.user2)] = Number(outstandingDebt[userList.indexOf(h.user2)]) - Number(h.value);
            }
            else if(h.user2 === props.user) { //user1 owes us money
                t.push(<TransactionHistoryElement user={props.user} user1={h.user1} user2={h.user2} memo={h.memo} value={h.value} isComplete={h.isComplete} dateCompleted={h.dateCompleted}/>);
                    outstandingDebt[userList.indexOf(h.user1)] = Number(outstandingDebt[userList.indexOf(h.user1)]) + Number(h.value);
            }
        }
        setHouseDebts();
        setTransactionList(t.reverse());
    }

    function showModal() {
        toggleVisiblity(!modalVisible);
      }

    return(
        <div style={pageStyle}>
          {debugMode &&
          <button onClick={deleteAll}>Delete all</button>}
          {props.setBgColor(colors.blue4)}
            <div style={{marginLeft: "25%", marginRight: "25%", display: "flex", justifyContent: "space-evenly"}}>
                {chargeView}
            </div>
        <div>
            <h2 style={{paddingLeft: "5%", color: colors.dark4}}>{"Transaction History"}</h2>
            <div style={{height: "250px", overflowY: "scroll", paddingLeft: "4%"}}>
            {transactionList}
            </div>
        </div>
    
      <div style={{backgroundColor:colors.dark2, padding: 5}}>
          <div onClick={showModal} style={{cursor: "pointer", backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
              <p style={{color: colors.light3, padding: 5}}>{"NEW CHARGE"}</p>
          </div>
      </div>
      <NewFinanceModal user={props.user} userList={userList} showModal={modalVisible} dismissModal={showModal} refreshFinances={props.triggerRefresh}/>
      </div>
    );
}

export default FinanceTab;