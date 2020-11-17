import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';

function RoommateAcctPage(props) {

    const username = props.clickedUser;
    const pic_url = "profile_pic_"+ props.clickedUser + ".svg";


    const pageStyle = {
        backgroundColor: colors.red,
        marginLeft: 50,
        marginRight: 50
    };

    function changeBg() {
        props.setBgColor(colors.red)
        console.log("red");
    }

    return(
        <div style={pageStyle}>
            <img src={pic_url} alt={username + "'s profile picture"} ></img> 
        </div>
    );

}

export default RoommateAcctPage;