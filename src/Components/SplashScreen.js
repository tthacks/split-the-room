import React, {useState} from 'react';
import '../Stylesheets/splashscreen.css';

function SplashScreen(props) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const validUsernames = props.usernames;
    const validPasswords = props.passwords;

    function usernameHandler(e) {
        setUsername(e.target.value);
    }

    function passwordHandler(e) {
        setPassword(e.target.value);
    }

    function confirmCredentials() {
        let userValid = validUsernames.indexOf(username);
        let passValid = validPasswords.indexOf(password);
        if(userValid > -1 && passValid > -1 && userValid === passValid) {
        props.setUser(username);
        props.allowAccess(true);
        }
        else {
            alert("That username/password combination does not exist.");
        }
    }

    return(
        <div className="splashscreen">
            <img src="split-the-door.svg" alt="Split the Room logo"></img>
            <h1>{"Split the Room"}</h1>
            <div className="text-group">{"Username   "}
            <input type="text" value={username} onChange={usernameHandler}/>
            </div>
            <div className="text-group">
            {"Password   "}
            <input type="password" value={password} onChange= {passwordHandler} />
            </div>
            <button onClick={confirmCredentials} style={{cursor: "pointer"}}>Log in</button>
        </div>
    );

}

export default SplashScreen;