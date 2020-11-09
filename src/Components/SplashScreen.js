import React, {useState} from 'react';

function SplashScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function confirmCredentials() {
        if(username==="admin" && password === "password") {
        props.allowAccess(true);
        }
        else {
            alert("That username/password combination does not exist.\n(Hint: the username is admin and the password is password)");
        }
    }

    return(
        <div>
            <h1>{"Split the Room"}</h1>
            <h4>{"Username"}</h4>
            <input type="text" value={username} onChange={usernameHandler}/>
            <h4>{"Password"}</h4>
            <input type="password" value={password} onChange= {passwordHandler} />
            <br></br>
            <button onClick={confirmCredentials}>Log in</button>
        </div>
    );

}

export default SplashScreen;