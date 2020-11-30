import React from 'react';
import * as colors from '../../colors'

function RoommateAcctEntry(props) {

    const bgColor = props.admin === true ? colors.green : colors.light3;
    const pic_url = "profile_pic_" + props.username + ".svg";
    const adminLabel = props.admin === true ? "(admin)" : "";
    const youLabel = props.currentUser === props.username ? " (you)" : "";
    const pageList = props.pageList;

    function gotoAcctPage() {
        props.setClickedUser(props.username);
        props.setActive(4);
        pageList.push(4);
        props.addPage(pageList);
        console.log(props.pageList);
    }

    return(
        <div onClick={gotoAcctPage} style = {{backgroundColor: bgColor}}>
            <img src={pic_url} alt={props.username + "'s profile picture"} style={{cursor: "pointer", float: "left", margin: 10}}></img>
            <h4 style={{cursor: "pointer", paddingLeft: 20, display: "inline-block"}}>{props.username} {adminLabel} {youLabel}</h4>
            <h3 style={{paddingBottom:1}}> </h3>
        </div>

    );
}

export default RoommateAcctEntry;