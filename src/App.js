import React, {useState} from 'react';
import MessageTab from './Components/MessageTab/MessageTab';
import FinanceTab from './Components/FinanceTab/FinanceTab';
import ChoresTab from './Components/ChoresTab/ChoresTab';
import TabHeader from './Components/SharedComponents/TabHeader';
import SplashScreen from './Components/SplashScreen';
import RoommateListPage from './Components/RoommateListPage/RoommateListPage';
import * as colors from './colors';

function App() {

  //const currentlyActive = 0; //0 is messages, 1 is finances, 2 is chores, 3 is a page with no tabs
  const [refresh, triggerRefresh] = useState(0);
  const [currentlyActive, setActive] = useState(0);
  const [prevActive, setPrev] = useState(0);
  const [noTabs, addTabs] = useState(false);
  const [isSignedIn, signIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [houseName, setHouseName] = useState("The Hokie Haus");

  const validUsernames = ["red", "yellow", "green"];
  const validPasswords = ["red", "yellow", "green"];
  const adminList = ["red"];

  function refreshView() {
    triggerRefresh(refresh + 1);
  }

  function logInUser(username) {
    setCurrentUser(username);
  }

  function gotoRoommateList() {
    addTabs(true);
    setPrev(currentlyActive);
    setActive(3);
  }

  function goBack() {
    setActive(prevActive);
    addTabs(false);
  }

  function placeHouseName() {
    if (!noTabs) {
      return (
        <div>
          <h1 onClick={gotoRoommateList} style={{color: colors.light3, display: "inline", marginTop: 0, paddingTop: 30, paddingLeft: 30, fontSize: 80}}>{houseName}</h1>
          <h3 onClick={gotoRoommateList} style={{color: colors.light3, display: "inline", paddingLeft: 30, fontSize: 25}}>4 members</h3>
        </div>
      );
    }
    return (
      <div>
        <h1 onClick={goBack} style={{color: colors.light3, float: "left", paddingTop: 30, paddingLeft: 30}}> &lt; Back</h1>
        <h1 style={{color: colors.light3, margin: 0, paddingTop: 30, paddingRight: 30, textAlign: "right", fontSize: 70}}>{houseName}</h1>
        <h3 style={{color: colors.light3, paddingRight: 30, textAlign: "right", fontSize: 25}}>4 members</h3>
      </div>
    );
  }

  return (
    <div>
      {!isSignedIn && <SplashScreen usernames ={validUsernames} passwords ={validPasswords} allowAccess={signIn} setUser={logInUser}/>}
      {isSignedIn && <div style={{backgroundColor: colors.blue4, height: "100vh", width: "100vw"}}>
      {placeHouseName()}
    <div>
      {noTabs === false && <TabHeader active={currentlyActive} setActive={setActive}/>}
      {currentlyActive === 0 && <MessageTab user={currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 1 && <FinanceTab user = {currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 2 && <ChoresTab triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 3 && <RoommateListPage houseName={houseName} setHouseName={setHouseName} user={currentUser} admins ={adminList} usernames ={validUsernames} triggerRefresh={refreshView} refreshCounter={refresh}/>}
    </div>
    </div>
    }
    </div>
  );
}

export default App;
