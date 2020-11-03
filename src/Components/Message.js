import React from 'react';

function Message(props) {

    const bgColor = props.important ? '#eb5757' :'#f2f2f2';

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