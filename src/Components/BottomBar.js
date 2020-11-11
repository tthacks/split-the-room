import React from 'react';
import $ from 'jquery';
import * as colors from '../colors';

function BottomBar(props) {

    // function openDialogue() {
    //     let newMessage = {
    //         author: "admin",
    //         msg: "This is a test message. Please disregard.",
    //         important: false
    //     };
    //     $.post('/newmessage', newMessage, function() {
    //     alert("opening dialogue");
    //     props.refreshMessages();
    //     });
    // }

    return(
        <div></div>
        // <div style={{backgroundColor:colors.dark2, padding: 5}}>
        //     <div onClick={openDialogue} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
        //         <p style={{color: colors.light3, padding: 5}}>{props.buttonText} </p>
        //     </div>
        // </div>
    );
}

export default BottomBar;