import React, { useEffect, useState } from 'react';
import * as colors from '../colors'
import NewFinanceModal from './NewFinanceModal';
import UserChargeView from './UserChargeView';

function FinanceTab(props) {
    const [modalVisible, toggleVisiblity] = useState(false);
    const [chargeView, setChargeView] = useState([]);

    useEffect(setHouseDebts, [props.refreshCounter]);

    //TODO: fetch this from server
    const debt_list = [{user: 'green', value: 0.00}, 
    {user: 'yellow', value: 1.00}, {user: 'house', value:'-20.00'}];

    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function setHouseDebts() {
        //TODO: get this information from the server
        setChargeView(debt_list.map(function(d) {
            return(<UserChargeView user={d.user} value={d.value}/>);
        }));
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
            <h2>Transaction History</h2>
        </div>
    
      <div style={{backgroundColor:colors.dark2, padding: 5}}>
          <div onClick={showModal} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
              <p style={{color: colors.light3, padding: 5}}>NEW CHARGE</p>
          </div>
      </div>
      <NewFinanceModal user={props.user} showModal={modalVisible} dismissModal={showModal} refreshFinances={props.triggerRefresh}/>
      </div>
    );
}

export default FinanceTab;