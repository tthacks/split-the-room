import React from 'react';
import * as colors from '../colors'

function Message(props) {

    const bgColor = props.important === "true" ? colors.orange : colors.light3;
    const pic_url = "profile_pic_"+ props.author + ".svg";

    return(
        <div style = {{backgroundColor: bgColor}}>
            <img src={pic_url} alt={props.author + "'s profile picture"} style={{float: "left", margin: 6}}></img> 
            <h4 style={{paddingLeft: 6, display: "inline-block"}}>{props.author}</h4>
            <h3 style={{paddingLeft: 12, paddingRight: 12, paddingBottom:12}}>{props.msg}</h3>
        </div>
    );

}

export default Message;