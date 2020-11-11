import React from 'react';
import * as colors from '../colors'

function Message(props) {

    const bgColor = props.important === "true" ? colors.orange : colors.light3;
    const textStyle = {
        padding: 12
    }

    return(
        <div style = {{backgroundColor: bgColor}}>
            <h3 style={textStyle}>{props.msg}</h3>
        </div>
    );

}

export default Message;