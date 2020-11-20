import React from 'react';

function ProfilePicture(props) {

    function gotoUserPage() {
        //TODO
    }

    return(
        <div>
            <img src={"profile_pic_" + props.user + ".svg"} alt={"profile"} onClick={gotoUserPage}></img>
        </div>
    )

}

export default ProfilePicture;