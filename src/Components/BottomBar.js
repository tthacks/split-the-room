import React from 'react';
import * as colors from '../colors';

function BottomBar(props) {

    function openDialogue() {
        alert("opening dialogue");
    }

    return(
        <div style={{backgroundColor:colors.dark2, padding: 5}}>
            <div onClick={openDialogue} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                <p style={{color: colors.light3, padding: 5}}>{props.buttonText} </p>
            </div>
        </div>
    );
}

export default BottomBar;