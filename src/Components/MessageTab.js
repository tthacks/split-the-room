import React, { useEffect, useState } from 'react';
import Message from './Message';
import BottomBar from './BottomBar';
import $ from 'jquery';
import * as colors from '../colors';

function MessageTab(props) {

    const [messages, setMessages] = useState([]);

    useEffect(fetchMessages);

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
        setMessages(obj.data.map(function (task) {
                      return (
              <Message key={task._id} _id={task._id} msg={task.msg} important={task.important}/>
            )
        }));
    }
      })
      .fail(function (obj) {
        console.log(obj.responseText);
      });
    }

//     const text = [{user: "0", msg: "Look at this cool rock I found", important: false}, 
//     {user: "2", msg: "WE NEED MORE TOILET PAPER ASAP", important: true},
//     {user: "0", msg: "I'm gonna go look for some cool rocks", important: false}
// ];
    
    // //turn the messages into Message Components
    // const message_list = messages.map(function(f) {
    //     return <Message key={text.indexOf(f)} important={f.important} msg={f.msg} />
    // });

    return(
        <div style={pageStyle}>
    <div style={{padding: 16}}>
            {messages}
        </div>
        <BottomBar buttonText="NEW POST"/>
        </div>
    );
}

export default MessageTab;