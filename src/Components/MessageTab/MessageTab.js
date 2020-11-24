import React, { useEffect, useState } from 'react';
import Message from './Message';
import $ from 'jquery';
import * as colors from '../../colors';
import NewMessageModal from './NewMessageModal';
function MessageTab(props) {

    const [messages, setMessages] = useState([]);
    const [modalVisible, toggleVisiblity] = useState(false);
    const debugMode = false;

    useEffect(fetchMessages, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light1,
        marginLeft: 50,
        marginRight: 50
    };

    function showModal() {
      toggleVisiblity(!modalVisible);
    }

    function renderEmpty() {
      if(messages.length === 0) {
        return <Message key={0} id={0} msg={"There are no messages right now. Say something to get the conversation started!"} important={false}/>;
      }
    }

    function deleteAll() {
      $.post('/deleteallmessages')
      .done(function(obj) {
        fetchMessages();
      })
    }

    function fetchMessages() {
        $.get('/fetchmessages')
      .done(function (obj) {
        if(obj === undefined || obj.data === undefined){
            console.log("fail");
        } 
        else {
          const d = obj.data.reverse();
        setMessages(d.map(function (m) {
                      return (<Message key={m._id} _id={m._id} author={m.author} msg={m.msg} important={m.important} pageList={props.pageList} addPage={props.addPage} setClickedUser={props.setClickedUser} setActive={props.setActive}/>)
        }));
    }
      })
      .fail(function (obj) {
        console.log(obj.responseText);
      });
    }

    return(
        <div style={pageStyle}>
          {debugMode &&
          <button onClick={deleteAll}>Delete all</button>}
          {props.setBgColor(colors.blue4)}
          <div style={{padding: 16, height: 400, overflowY: "scroll"}}>
            {renderEmpty()}
            {messages}
          </div>
        <div style={{backgroundColor:colors.dark2, padding: 5}}>
            <div onClick={showModal} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                <p style={{cursor: "pointer", color: colors.light3, padding: 5}}>NEW POST</p>
            </div>
        </div>
        <NewMessageModal user={props.user} showModal={modalVisible} dismissModal={showModal} refreshMessages={props.triggerRefresh}/>
        </div>
    );
}

export default MessageTab;