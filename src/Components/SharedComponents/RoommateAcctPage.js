import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';
import ChangeBgModal from './ChangeBgModal';
import EditPetPeevesModal from './EditPetPeevesModal';
import Slider from '@material-ui/core/Slider';

function RoommateAcctPage(props) {

    const currUser = props.user;
    const clickedUser = props.clickedUser;
    const pic_url = "profile_pic_"+ props.clickedUser + ".svg";
    const houseName = props.houseName;
    const bgColor = props.bgColor;
    const active = props.active
    const petPeeves = props.petPeeves;
    const acctBgs = props.acctBgs;
    const [modalBGVisible, toggleBGVisiblity] = useState(false);
    const [modalPVisible, togglePVisiblity] = useState(false);
    
    

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
        width: "44%",
        padding: "2%",
        float: "left", 
        marginLeft: "6%"
    };

    const peevesBox2 = {
        backgroundColor: colors.light3,
        width: "44%",
        padding: "2%",
        float: "left", 
        marginLeft: "26%"
    };

    const marks = [
        {
          value: 0,
          label: '1',
        },
        {
          value: 10,
          label: '2',
        },
        {
          value: 20,
          label: '3',
        },
        {
          value: 30,
          label: '4',
        },
        {
          value: 40,
          label: '5',
        },
        {
          value: 50,
          label: '6',
        },
        {
          value: 60,
          label: '7',
        },
        {
          value: 70,
          label: '8',
        },
        {
          value: 80,
          label: '9',
        },
        {
          value: 90,
          label: '10',
        },
      ];
      
    function valueLabelFormat(value) {
        return marks.findIndex((mark) => mark.value === value) + 1;
    }

    function addSliders() {
        if (currUser === clickedUser) {
            return (
                <Slider
                    style={{marginLeft: "15%", width: "66%"}}
                    max={90}
                    defaultValue={40}
                    valueLabelFormat={valueLabelFormat}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                />
            );
        }
        else {
            return (
                <Slider
                    style={{marginLeft: "15%", width: "66%"}}
                    max={90}
                    defaultValue={40}
                    valueLabelFormat={valueLabelFormat}
                    aria-labelledby="discrete-slider-restrict"
                    step={null}
                    valueLabelDisplay="auto"
                    marks={marks}
                    disabled
                />
            );
        }
        
    }
    function signOut() {
        props.signIn(false);
        props.setActive(0);
        props.setPageHeader(0);
        props.addPage([0]);
    }

    function addLogOut() {
        if (currUser === clickedUser) {
            return (
                <div onClick={signOut} style={{cursor: "pointer", backgroundColor: colors.dark1, width: "10%", height: 43, textAlign: "center", float: "right", position: "relative", top: 50, right: "3%"}}>
                            <p style={{color: colors.light3, padding: 5, position: "relative", bottom: 10}}>LOG OUT</p>
                </div>
            );
        }
    }



    function showBGModal() {
        toggleBGVisiblity(!modalBGVisible);
    }

    function showPModal() {
        togglePVisiblity(!modalPVisible);
    }

    function updateBg() {
        let newColor = acctBgs[0];
        if (clickedUser === "yellow") {
            newColor = acctBgs[1];
        }
        else if (clickedUser === "green") {
            newColor = acctBgs[2];
        }

        if (newColor === "red") {
            return props.setBgColor(colors.red);
        }
        else if (newColor === "orange") {
            return props.setBgColor(colors.orange);
        }
        else if (newColor === "yellow") {
            return props.setBgColor(colors.yellow);
        }
        else if (newColor === "green") {
            return props.setBgColor(colors.green);
        }
        else if (newColor === "blue") {
            return props.setBgColor(colors.blue4);
        }
        else if (newColor === "purple") {
            return props.setBgColor(colors.purple);
        }
    }

    function addChangeBg() {
        if (currUser === clickedUser) {
            return (
                <div onClick={showBGModal} style={{cursor: "pointer", backgroundColor: colors.green, width: "20%", height: 43, textAlign: "center", float: "left", position: "relative", left: "3%", top: "5%"}}>
                    <p style={{color: colors.light3, padding: 5, position: "relative", bottom: 10}}>CHANGE BACKGROUND</p>
                </div>
            );
        }
    }

    function addPetPeeves() {
        let currPeeve = "";
        if (clickedUser === "red") {
            currPeeve = petPeeves[0];
            console.log("red's peeves");
        }
        else if (clickedUser === "yellow") {
            currPeeve = petPeeves[1];
            console.log("yellow's peeves");
        }
        else {
            currPeeve = petPeeves[2];
            console.log("green's peeves");
        }

        if (currUser === clickedUser) {
            return (
                <div style={peevesBox}>
                        <text>{currPeeve}</text>
                </div>  
            );
        }
        else {
            return (
                <div style={peevesBox2}>
                        <text>{currPeeve}</text>
                </div>  
            );
        }
    }

    function addEditPeeves() {
        if (currUser === clickedUser) {
            return (
                <div onClick={showPModal} style={{cursor: "pointer", backgroundColor: colors.green, width: "20%", height: 43, textAlign: "center", float: "right", position: "relative", right: "3%", top: "5%"}}>
                    <p style={{color: colors.light3, padding: 5, position: "relative", bottom: 10}}>EDIT PET PEEVES</p>
                </div>
            );
        }
    }

    return(
        <div>
            {props.setPageHeader(2)}
            {console.log(petPeeves)}
            {updateBg()}
            <img src={pic_url} alt={clickedUser + "'s profile picture"} style={{marginLeft: "34%", width: "12%", paddingTop: 50}}></img> 
            {addLogOut()}
            <h1 style={{color: colors.light3, display: "block", textAlign: "center", fontSize: 40, marginTop: 0}}>{clickedUser}</h1>
            <div style={bodyBox}>
                
                <div style={houseNameBox}>
                    <h2 style={{textAlign: "center"}}>Member of {houseName}</h2>
                </div>
                <div>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Messy</text>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "58%", marginRight: 20, display: "inline"}}>Tidy</text>
                    {addSliders()}
                </div>
                <div style={{paddingTop: 30, paddingBottom: 30}}>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "15%", width: "10%", display: "inline"}}>Quiet</text>
                    <text id="discrete-slider-restrict" style={{fontSize: 20, marginLeft: "58%", marginRight: 20, display: "inline"}}>Loud</text>
                    {addSliders()}
                </div>
                <text style={{fontSize: 20, marginLeft: "46%"}}>Pet Peeves</text>
                <div style={{overflow: "hidden"}}>
                    
                    {addChangeBg()}
                    {addPetPeeves()}
                    {addEditPeeves()}
                </div>


            </div>
            <ChangeBgModal setBgColor={props.setBgColor} acctBgs={acctBgs} editAcctBgs={props.editAcctBgs} user={currUser} showModal={modalBGVisible} dismissModal={showBGModal} refreshMessages={props.triggerRefresh}/>
            <EditPetPeevesModal petPeeves={petPeeves} editPeeves={props.editPeeves} user={currUser} showModal={modalPVisible} dismissModal={showPModal} refreshMessages={props.triggerRefresh}/>
        </div>
    );

}

export default RoommateAcctPage;