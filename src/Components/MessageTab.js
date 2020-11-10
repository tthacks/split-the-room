import React, { useEffect, useState } from 'react';
import Message from './Message';
import BottomBar from './BottomBar';
import $ from 'jquery';
import * as colors from '../colors';

function MessageTab(props) {

    const [messages, setMessages] = useState([]);

    useEffect(fetchMessages, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function fetchMessages() {
        $.get('/fetchmessages')
      .done(function (obj) {
        console.log(obj.data);
        if(obj === undefined || obj.data === undefined){
            console.log("fail");
        } 
        else {
        setMessages(obj.data.map(function (m) {
                      return (<Message key={m._id} _id={m._id} author={m.author} msg={m.msg} important={m.important} deleted={false}/>)
        }));
    }
      })
      .fail(function (obj) {
        console.log(obj.responseText);
      });
    }

    return(
        <div style={pageStyle}>
    <div style={{padding: 16}}>
            {messages}
        </div>
        <BottomBar buttonText="NEW POST" refreshMessages={props.triggerRefresh}/>
        </div>
    );
}

export default MessageTab;