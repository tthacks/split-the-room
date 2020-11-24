import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';
import '../../Stylesheets/notifications.css';

function NotificationBar(props) {

    const [notifications, setNotifications] = useState([]);

    useEffect(fetchNotifications, [props.refreshCounter, props.user]);

    function fetchNotifications() {
        $.get('/fetchnotifications')
        .done(function (obj) {
          setNotifications(obj.data.filter(function(m) {
            return m.target === props.user
          }).map(function (m) {
            return (<div className="notificationBox">
              {m.deleted === "false" && 
                <div className="notificationText">
                         {m.msg}
                <button id={m._id} onClick={deleteNotification}>X</button>
                </div>}
            </div>)
      }))})
        .fail(function (obj) {
          console.log(obj.responseText);
        });
      }

      function deleteNotification(e) {
          let data={
            _id: e.target.id,
            deleted: true
          }
          $.post('/deletenotification', data, function() {
            props.triggerRefresh();
          })
      }

  function deleteAll() {
    $.post('/deleteNotifications')
    .done(function(obj) {
      props.triggerRefresh();
    })
  }

    return(
        <div>
            {notifications}
      </div>
    );

}

export default NotificationBar;