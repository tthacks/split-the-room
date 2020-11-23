import React from 'react';
import * as colors from '../../colors'

function Message(props) {

    const bgColor = props.important === "true" ? colors.orange : colors.light3;
    const pic_url = "profile_pic_"+ props.author + ".svg";
    const pageList = props.pageList;

    function gotoAcctPage() {
        props.setClickedUser(props.author);
        props.setActive(4);
        pageList.push(4);
        props.addPage(pageList);
        console.log(props.pageList);
    }

    return(
        <div style = {{backgroundColor: bgColor}}>
            <img src={pic_url} alt={props.author + "'s profile picture"} onClick={gotoAcctPage} style={{cursor: "pointer", float: "left", margin: 6}}></img> 
            <h4 onClick={gotoAcctPage} style={{cursor: "pointer", paddingLeft: 6, display: "inline-block"}}>{props.author}</h4>
            <h3 style={{paddingLeft: 12, paddingRight: 12, paddingBottom:12}}>{props.msg}</h3>
        </div>
    );

}

export default Message;