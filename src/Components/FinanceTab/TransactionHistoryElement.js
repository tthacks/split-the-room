import React from 'react';
import * as colors from '../../colors';
import '../../Stylesheets/finances.css';

function TransactionHistoryElement(props) {

    function formatValue() {
        if(props.value < 0) {
            const value = 0 - props.value;
            return <h4 className="value" style={{color: colors.red}}>{'-$' + value}</h4>
        }
        else {
            return <h4 className="value" style={{color: colors.green}}>{'$' + props.value}</h4>
        }
    }

    function formatMessage() {
        if(props.value < 0) {
            return <h4 className="message">You paid {props.user}</h4>;
        }
        return <h4 style={{alignSelf: "end"}}>{props.user} paid you</h4>;
    }

    return(<div className="transaction">
        {formatValue()}
        {formatMessage()}
        <span className="date">{props.dateCompleted}</span>
    </div>);

}

export default TransactionHistoryElement;