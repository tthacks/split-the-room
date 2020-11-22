import React from 'react';
import $ from 'jquery';
import * as colors from '../../colors';
import '../../Stylesheets/finances.css';

function UserChargeView(props) {

    function formatValue() {
        const value = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(props.value);
        if(props.value < 0) {
            return <h4 style={{color: colors.red}}>{value}</h4>
        }
        else {
            return <h4 style={{color: colors.green}}>{value}</h4>
        }
    }

    function payRemindButton() {
        if(props.value === 0) {
            return <button style={{visibility: "hidden"}}></button>
        }
        else if(props.value < 0) {
            return <button onClick={payDebt}>MARK PAID</button>
        }
        else {
        return <button onClick={remindUser}>REMIND</button>
        }
    }

    function remindUser() {
        const value = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(props.value);
        let reminder ={
            target: props.user,
            msg: "Don't forget to pay " + props.currentUser + " " + value + "!",
            deleted: false
        };
        $.post("/newnotification", reminder, function() {
            props.triggerRefresh();
        })
    }

    function payDebt() {
        let newCharge = {
            user1: props.user, 
            user2: props.currentUser,
            value: 0 - Number(props.value),
            isComplete: true, 
            dateCompleted: new Date().toDateString(),
        }
        $.post("/newcharges", newCharge, function() {
            props.triggerRefresh();
        })
    }

    if(props.currentUser === props.user) {
        return null;
    }
    return(<div className="chargeview">
        <img src={"profile_pic_"+props.user+".svg"} alt="user profile"></img>
        <h3>{props.user}</h3>
        {formatValue()}
        {payRemindButton()}
    </div>);
    
}

export default UserChargeView;