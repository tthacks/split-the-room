import React from 'react';
import * as colors from '../colors';

function TransactionHistoryElement(props) {

    function formatValue() {
        if(props.value < 0) {
            const value = 0 - props.value;
            return <h4 style={{color: colors.red}}>{'-$' + value}</h4>
        }
        else {
            return <h4 style={{color: colors.green}}>{'$' + props.value}</h4>
        }
    }

    function formatMessage() {
        if(props.value < 0) {
            return <h4>You paid {props.user}</h4>;
        }
        return <h4>{props.user} paid you</h4>;
    }

    return(<div>
        {formatValue()}
        {formatMessage()}
        {props.dateCompleted}
    </div>);

}

export default TransactionHistoryElement;