import React from 'react';
import * as colors from '../colors'

function Message(props) {

    const bgColor = props.important === "true" ? colors.orange : colors.light3;

    return(
        <div style = {{backgroundColor: bgColor}}>
            <h4 style={{paddingLeft: 6}}>{props.author}</h4>
            <h3 style={{paddingLeft: 12, paddingRight: 12, paddingBottom:12}}>{props.msg}</h3>
        </div>
    );

}

export default Message;