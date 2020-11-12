import React, { useEffect, useState } from 'react';
import RoommateAcct from './RoommateAcct';
import $ from 'jquery';
import * as colors from '../../colors';

function RoommateListPage(props) {

    const validUsernames = props.usernames;
    const admins = props.admins;

    // useEffect(fetchRoommates, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light2,
        padding: 16,
        marginLeft: 50,
        marginRight: 50
    };
    
    function listRoommates() {
        let adminAccts = validUsernames.filter(acct => admins.includes(acct));
        let i;
        for (i = 0; i < validUsernames.length; i++) {
            let isAdmin = adminAccts.indexOf(validUsernames[i]);
            if (isAdmin > -1) {
                return <RoommateAcct admin={true} username={validUsernames[i]}/>
            }
            else {
                return <RoommateAcct admin={false} username={validUsernames[i]}/>
            }
        }
    }

    return(
        <div style={pageStyle}>
            {listRoommates()}
        </div>
    );
}

export default RoommateListPage;