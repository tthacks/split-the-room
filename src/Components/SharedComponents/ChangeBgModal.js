import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';
import * as colors from '../../colors';


function ChangeBgModal(props) {

    const acctBgs = props.acctBgs;
    const user = props.user;
    const [newColor, setNewColor] = useState("DEFAULT");


    function dismissModal(e) {
        props.dismissModal();
    }

    function storeValue(e) {
        setNewColor(e.target.value);
    }

    function changeBgHandler() {
        return (
            <select defaultValue={'DEFAULT'} onChange={storeValue}>
                <option value="DEFAULT" disabled>Choose a color...</option>
                <option value="red">Red</option>
                <option value="orange">Orange</option>
                <option value="yellow">Yellow</option>
                <option value="green">Green</option>
                <option value="blue">Blue</option>
                <option value="purple">Purple</option>
            </select>
        );
    }

    function submit() {
        if (newColor === "DEFAULT") {
            alert("Please choose a background color");
            return;
        }

        if (newColor === "red") {
            props.setBgColor(colors.red);
        }
        else if (newColor === "orange") {
            props.setBgColor(colors.orange);
        }
        else if (newColor === "yellow") {
            props.setBgColor(colors.yellow);
        }
        else if (newColor === "green") {
            props.setBgColor(colors.green);
        }
        else if (newColor === "blue") {
            props.setBgColor(colors.blue4);
        }
        else if (newColor === "purple") {
            props.setBgColor(colors.purple);
        }

        let green = acctBgs.pop();
        let yellow = acctBgs.pop();
        let red = acctBgs.pop();
        if (user === "red") {
            acctBgs.push(newColor);
            acctBgs.push(yellow);
            acctBgs.push(green);
        }
        else if (user === "yellow") {
            acctBgs.push(red);
            acctBgs.push(newColor);
            acctBgs.push(green);
        }
        else {
            acctBgs.push(red);
            acctBgs.push(yellow);
            acctBgs.push(newColor);
        }
        props.editAcctBgs(acctBgs);
        console.log(acctBgs);
        setNewColor("DEFAULT");
        dismissModal();
    }

    return(
        <div>
            {props.showModal && <div className="modal" id="bgModal">
                <div className="modal-content">
                    <h3 onClick={dismissModal}>X</h3>
                        <h2>Choose your background color</h2>
                        {changeBgHandler()}
                        <div style={{display: "flex", justifyContent: "center", paddingTop: 25}}>
                            <button onClick={submit} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}>SUBMIT</button>
                        </div>
                </div>
            </div>}
        </div>
    );
}

export default ChangeBgModal;