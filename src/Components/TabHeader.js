import React from 'react';

function TabHeader(props) {

    const textStyle = {
        color: "#ffffff",
        textAlign: "center"
    };
    function setActive() {
        //TODO
    }

return(
    <div style = {{marginLeft: 50, display: "inline-flex"}}>
        <div onClick={setActive} style={{padding: 5, backgroundColor: props.active === 0 ? "#c4c4c4" : "#828282"}}>
            <h3 style={textStyle}>Messages</h3>
        </div >
        <div onClick={setActive} style={{padding: 5, backgroundColor: props.active === 1 ? "#c4c4c4" : "#828282"}}>
            <h3 style={textStyle}>Finances</h3>
        </div>
        <div onClick={setActive} style={{padding: 5, backgroundColor: props.active === 2 ? "#c4c4c4" : "#828282"}}>
            <h3 style={textStyle}>Chores</h3>
        </div>
    </div>
)


}

export default TabHeader;