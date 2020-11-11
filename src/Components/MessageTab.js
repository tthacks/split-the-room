import React, { useEffect, useState } from 'react';
import Message from './Message';
import $ from 'jquery';
import * as colors from '../colors';
import NewMessageModal from './NewMessageModal';

function MessageTab(props) {

    const [messages, setMessages] = useState([]);
    const [modalVisible, toggleVisiblity] = useState(false);

    useEffect(fetchMessages, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function showModal() {
      toggleVisiblity(!modalVisible);
    }

    function fetchMessages() {
        $.get('/fetchmessages')
      .done(function (obj) {
        console.log(obj.data);
        if(obj === undefined || obj.data === undefined){
            console.log("fail");
        } 
        else {
          const d = obj.data.reverse();
        setMessages(d.map(function (m) {
                      return (<Message key={m._id} _id={m._id} author={m.author} msg={m.msg} important={m.important}/>)
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
        <div style={{backgroundColor:colors.dark2, padding: 5}}>
            <div onClick={showModal} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                <p style={{color: colors.light3, padding: 5}}>NEW POST</p>
            </div>
        </div>
        <NewMessageModal showModal={modalVisible} dismissModal={showModal} refreshMessages={props.triggerRefresh}/>
        </div>
    );
}

export default MessageTab;