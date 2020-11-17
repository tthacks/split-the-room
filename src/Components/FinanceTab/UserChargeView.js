import React from 'react';
import * as colors from '../../colors';
import '../../Stylesheets/finances.css';

function UserChargeView(props) {

    function formatValue() {
        if(props.value < 0) {
            const value = 0 - props.value;
            return <h4 style={{color: colors.red}}>{'-$' + value}</h4>
        }
        else {
            return <h4 style={{color: colors.green}}>{'$' + props.value}</h4>
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
        return <button>REMIND</button>
        }
    }

    function payDebt() {
        //TODO
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