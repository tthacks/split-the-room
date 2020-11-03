import React from 'react';

function BottomBar(props) {

    function openDialogue() {
        alert("opening dialogue");
    }

    return(
        <div style={{backgroundColor:"#828282", padding: 5}}>
            <div onClick={openDialogue} style={{backgroundColor: "#6fcf97", width: "20%", textAlign: "center", marginLeft: "40%"}}>
                <p style={{color: "#ffffff", padding: 5}}>{props.buttonText} </p>
            </div>
        </div>
    );
}

export default BottomBar;