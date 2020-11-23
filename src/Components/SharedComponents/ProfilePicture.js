import React from 'react';

function ProfilePicture(props) {

    function gotoAcctPage() {
        props.setClickedUser(props.user);
        props.setActive(4);
        props.pageList.push(4);
        props.addPage(props.pageList);
        console.log(props.pageList);
    }

    return(
        <div>
            <img src={"profile_pic_" + props.user + ".svg"} alt={"profile"} onClick={gotoAcctPage} style={{cursor: "pointer"}}></img>
        </div>
    )

}

export default ProfilePicture;