import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import * as colors from '../../colors';

function NotificationBar(props) {

    const [notifications, setNotifications] = useState([]);

    useEffect(fetchNotifications, [props.refreshCounter, props.user]);

    function fetchNotifications() {
        $.get('/fetchnotifications')
        .done(function (obj) {
          setNotifications(obj.data.filter(function(m) {
            return m.target === props.user
          }).map(function (m) {
            return (<div>
                <div style={{backgroundColor: colors.orange}}>
                         {m.msg}
                </div>
            </div>)
      }))})
        .fail(function (obj) {
          console.log(obj.responseText);
        });
      }

  function deleteNotifications() {
    $.post('/deleteNotifications')
    .done(function(obj) {
      props.triggerRefresh();
    })
  }

    return(
        <div>
            {notifications}
            <div style={{backgroundColor: colors.blue4}}>
      {notifications.length !== 0 && <button onClick={deleteNotifications}>Delete Notifications</button>}
      </div>
        </div>
    );

}

export default NotificationBar;