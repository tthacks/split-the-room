import React from 'react';
import Message from './Message';
import BottomBar from './BottomBar';

function MessageTab(props) {

    const pageStyle = {
        backgroundColor: "#c4c4c4",
        marginLeft: 50,
        marginRight: 50
    };

    const text = [{user: "0", msg: "Look at this cool rock I found", important: false}, 
    {user: "2", msg: "WE NEED MORE TOILET PAPER ASAP", important: true},
    {user: "0", msg: "I'm gonna go look for some cool rocks", important: false}
];
    
    //turn the messages into Message Components
    const message_list = text.map(function(f) {
        return <Message key={text.indexOf(f)} important={f.important} msg={f.msg} />
    });

    return(
        <div style={pageStyle}>
    <div style={{padding: 16}}>
            {message_list}
        </div>
        <BottomBar buttonText="NEW POST"/>
        </div>
    );
}

export default MessageTab;