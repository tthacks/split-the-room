import React, {useState} from "react";
import $ from 'jquery';
import '../../Stylesheets/modal.css';

function ChangeBgModal(props) {

//     const [msg, setMsg] = useState("");
//     const [isUrgent, setUrgent] = useState(false);


//     function dismissModal(e) {
//         props.dismissModal();
//     }

//     function messageHandler(e) {
//         setMsg(e.target.value);
//     }

//     function isUrgentHandler(e) {
//         setUrgent(!isUrgent);
//     }

//     function submit() {
//         let newMessage = {
//             author: props.user,
//             msg: msg,
//             important: isUrgent,
//         }
//         if (newMessage.msg === "") {
//             alert("Please include content in your message.");
//         }
//         else {
//             $.post('/newmessage', newMessage, function() {
//                 setUrgent(false);
//                 setMsg("");
//                 props.refreshMessages();
//                 dismissModal();
//             });
//         }
//     }

 return(
    <div>
        {props.showModal && console.log("change bg")}
        {/* {props.showModal && <div className="modal" id="messageModal">
        <div className="modal-content">
        <h3 onClick={dismissModal}>X</h3>
            <h2>New Message</h2>
            <textarea onChange={messageHandler} placeholder="Type message here..."></textarea>
            <div className="check-urgent">
            Mark urgent
            <input type="checkbox" onChange={isUrgentHandler}></input> 
            </div>
            <button onClick={submit}>Submit</button>
        </div>
        </div>} */}
    </div>
    );
}

export default ChangeBgModal;