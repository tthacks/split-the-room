import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';

function RoommateAcctPage(props) {

    const username = props.clickedUser;
    const pic_url = "profile_pic_"+ props.clickedUser + ".svg";
    const houseName = props.houseName;

    const boxStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function changeBg() {
        props.setBgColor(colors.red)
        console.log("red");
    }

    return(
        <div>
            {props.setPageHeader(2)}
            <img src={pic_url} alt={username + "'s profile picture"} style={{display: "block", marginLeft: "44%", marginRight: "50%", width: "12%", paddingTop: 50}}></img> 
            <h1 style={{display: "block", textAlign: "center",}}>{username}</h1>
            <div style={boxStyle}>
                <h2 style={{textAlign: "center"}}>Member of {houseName}</h2>
            </div>
        </div>
    );

}

export default RoommateAcctPage;