import React from 'react';
import * as colors from '../../colors'

function RoommateAcct(props) {

    const bgColor = props.admin === true ? colors.green : colors.light3;
    const pic_url = "profile_pic_" + props.username + ".svg";
    const adminLabel = props.admin === true ? "(admin)" : "";


    return(
        <div style = {{backgroundColor: bgColor}}>
            <img src={pic_url} alt={props.username + "'s profile picture"} style={{float: "left", margin: 10}}></img>
            <h4 style={{paddingLeft: 20, display: "inline-block"}}>{props.username} {adminLabel}</h4>
            <h3 style={{paddingBottom:1}}></h3>
        </div>

    );
}

export default RoommateAcct;