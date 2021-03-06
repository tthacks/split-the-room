import React, { useState } from 'react';
import RoommateAcctEntry from './RoommateAcctEntry';
import * as colors from '../../colors';
import ChangeHouse from './ChangeHouse';


function RoommateListPage(props) {

    const validUsernames = props.usernames;
    const admins = props.admins;
    const user = props.user;
    const [modalVisible, toggleVisiblity] = useState(false);
    const houseName = props.houseName;

    const pageStyle = {
        backgroundColor: colors.light2,
        padding: 16,
        marginLeft: 50,
        marginRight: 50
    };
    
    function listRoommates() {
        let list = validUsernames.map(function (m) {
            console.log(m);
            if (admins.includes(m)) {
                return (
                    <RoommateAcctEntry 
                        key={m._id} 
                        _id={m._id} 
                        pageList={props.pageList} 
                        addPage={props.addPage} 
                        setClickedUser={props.setClickedUser} 
                        currentlyActive={props.currentlyActive} 
                        setActive={props.setActive} 
                        admin={true} 
                        username={m}
                        currentUser={props.currentUser}
                    />
                );
            }
            return (
                <RoommateAcctEntry 
                    key={m._id} 
                    _id={m._id} 
                    pageList={props.pageList} 
                    addPage={props.addPage} 
                    setClickedUser={props.setClickedUser} 
                    setActive={props.setActive} 
                    admin={false} 
                    username={m}
                    currentUser={props.currentUser}
                />
            );
        });
        return list;
    }

    function adminFeatures() {
        if (admins.includes(user)) {
            return (
                <div style={{backgroundColor:colors.dark2, padding: 5}}>
                    <div onClick={showModal}style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                        <p style={{cursor: "pointer", color: colors.light3, padding: 5}}>EDIT HOUSE NAME</p>
                    </div>
                </div>
            );
        }
    }

    function showModal() {
        toggleVisiblity(!modalVisible);
    }


    return(
        <div style={pageStyle}>
            {props.setBgColor(colors.blue4)}
            {listRoommates()}
            {adminFeatures()}
            <ChangeHouse houseName={houseName} setHouseName={props.setHouseName} showModal={modalVisible} dismissModal={showModal} refreshRoommates={props.triggerRefresh}/>
        </div>
    );
}

export default RoommateListPage;