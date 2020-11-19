import React, { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import $ from 'jquery';
import * as colors from '../../colors';

function RoommateAcctPage(props) {

    const username = props.clickedUser;
    const pic_url = "profile_pic_"+ props.clickedUser + ".svg";
    const houseName = props.houseName;

    const houseNameBox = {
        backgroundColor: colors.green,
        marginLeft: "35%",
        marginRight: "35%",
        position: "relative", 
        bottom: 20
    };

    const bodyBox = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    const peevesBox = {
        backgroundColor: colors.light3,
        marginLeft: "25%",
        marginRight: "25%",
        padding: "2%"
    };

    function changeBg() {
        props.setBgColor(colors.red)
        console.log("red");
    }

    return(
        <div>
            {props.setPageHeader(2)}
            <img src={pic_url} alt={username + "'s profile picture"} style={{display: "block", marginLeft: "44%", marginRight: "50%", width: "12%", paddingTop: 50}}></img> 
            <h1 style={{color: colors.light3, display: "block", textAlign: "center", fontSize: 40, marginTop: 0}}>{username}</h1>
            <div style={bodyBox}>
                
                <div style={houseNameBox}>
                    <h2 style={{textAlign: "center"}}>Member of {houseName}</h2>
                </div>
                <div>
                    <text style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Messy</text>
                    <hr style={{height: 5, width: "60%", color: colors.purple, backgroundColor: colors.purple, display: "inline-block", position: "relative", top: 5, left: 20}}></hr>
                    <Draggable axis="x">
                        <span class="dot" style={{height: 20, width: 20, backgroundColor: colors.light3, borderRadius: "50%", display: "inline-block", position: "relative", top: 2}}></span>
                    </Draggable>
                    <text style={{fontSize: 20, marginLeft: 20, marginRight: 20, display: "inline"}}>Tidy</text>
                </div>
                <div style={{paddingTop: 30, paddingBottom: 30}}>
                    <text style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Quiet</text>
                    <hr style={{height: 5, width: "60%", color: colors.purple, backgroundColor: colors.purple, display: "inline-block", position: "relative", top: 5, left: 27}}></hr>
                    <Draggable axis="x">
                        <span class="dot" style={{height: 20, width: 20, backgroundColor: colors.light3, borderRadius: "50%", display: "inline-block", position: "relative", top: 2}}></span>
                    </Draggable>
                    <text style={{fontSize: 20, marginLeft: 25, marginRight: 20, display: "inline"}}>Loud</text>
                </div>
                <div>
                    <text style={{fontSize: 20, marginLeft: "46%"}}>Pet Peeves</text>
                    <div style={peevesBox}>
                        <text> test </text>
                    </div>
                </div>


            </div>
            
        </div>
    );

}

export default RoommateAcctPage;