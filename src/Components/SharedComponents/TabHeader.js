import React from 'react';
import * as colors from "../../colors"

function TabHeader(props) {

    function setMessagesActive() {
        props.setActive(0);
    }
    function setFinancesActive() {
        props.setActive(1);
    }
    function setChoresActive() {
        props.setActive(2);
    }

return(
    <div style = {{marginLeft: 50, display: "inline-flex"}}>
        <div onClick={setMessagesActive} style={{padding: 5, backgroundColor: props.active === 0 ? colors.light1: colors.dark2}}>
            <h3 style={{textAlign: "center", color: props.active === 0 ? colors.dark2 : colors.light1}}>Messages</h3>
        </div >
        <div onClick={setFinancesActive} style={{padding: 5, backgroundColor: props.active === 1 ? colors.light1: colors.dark2}}>
            <h3 style={{textAlign: "center", color: props.active === 1 ? colors.dark2 : colors.light1}}>Finances</h3>
        </div>
        <div onClick={setChoresActive} style={{padding: 5, backgroundColor: props.active === 2 ? colors.light1: colors.dark2}}>
            <h3 style={{textAlign: "center", color: props.active === 2 ? colors.dark2 : colors.light1}}>Chores</h3>
        </div>
    </div>
)


}

export default TabHeader;