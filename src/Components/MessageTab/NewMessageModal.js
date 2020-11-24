import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

function NewMessageModal(props) {

    const [msg, setMsg] = useState("");
    const [isUrgent, setUrgent] = useState(false);


    function dismissModal(e) {
        props.dismissModal();
    }

    function messageHandler(e) {
        setMsg(e.target.value);
    }

    function isUrgentHandler(e) {
        setUrgent(!isUrgent);
    }

    function submit() {
        let newMessage = {
            author: props.user,
            msg: msg,
            important: isUrgent,
        }
        if (newMessage.msg === "") {
            alert("Please include content in your message.");
        }
        else {
            $.post('/newmessage', newMessage, function() {
                setUrgent(false);
                setMsg("");
                props.refreshMessages();
                dismissModal();
            });
        }
    }

return(
    <div>
        {props.showModal && <div className="modal" id="messageModal">
        <div className="modal-content">
            <h3 onClick={dismissModal}>X</h3>
                <h2>New Message</h2>
                <textarea onChange={messageHandler} style={{fontFamily: "arial", fontSize: 23}} placeholder="Type message here..."></textarea>
                <div className="check-urgent" style={{padding: 10}}>
                    <text style={{paddingRight: 25}}>Mark urgent</text>
                    <input type="checkbox" onChange={isUrgentHandler} style={{width: 20, height: 20, position: "relative", top: 3}}></input> 
                </div>
                <div style={{display: "flex", justifyContent: "center", paddingTop: 25}}>
                    <button onClick={submit} style={{paddingLeft: 20, paddingRight: 20, paddingTop: 5, paddingBottom: 5, fontSize: 16}}>SUBMIT</button>
                </div>
        </div>
        </div>}
    </div>
);
}

export default NewMessageModal;