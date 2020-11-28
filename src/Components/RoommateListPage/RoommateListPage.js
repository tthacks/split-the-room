import React, { useEffect, useState } from 'react';
import RoommateAcctEntry from './RoommateAcctEntry';
import $ from 'jquery';
import * as colors from '../../colors';
import AddRoommateModal from './AddRoommateModal';
import ChangeHouse from './ChangeHouse';


function RoommateListPage(props) {

    const validUsernames = props.usernames;
    const admins = props.admins;
    const user = props.user;
    const [modalVisible, toggleVisiblity] = useState(false);
    const houseName = props.houseName;
    // const [listedRoommates, addToList] = useState([]);

    // useEffect(fetchRoommates, [props.refreshCounter]);

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
                />
            );
        });
        // addToList(list);
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