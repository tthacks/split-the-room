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
    setActive(3);
  }

  return (
    <div>
      {!isSignedIn && <SplashScreen usernames ={validUsernames} passwords ={validPasswords} allowAccess={signIn} setUser={logInUser}/>}
      {isSignedIn && <div style={{backgroundColor: colors.blue4, height: "100vh", width: "100vw"}}>
      <div onClick={gotoRoommateList}>
        <h1 style={{color: colors.light3, marginTop: 0, paddingTop: 30, fontSize: 50}}>{houseName}</h1>
      </div>
    <div>
      {noTabs === false && <TabHeader active={currentlyActive} setActive={setActive}/>}
      {currentlyActive === 0 && <MessageTab user={currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 1 && <FinanceTab user = {currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 2 && <ChoresTab triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 3 && <RoommateListPage admins ={adminList} usernames ={validUsernames} triggerRefresh={refreshView} refreshCounter={refresh}/>}
    </div>
    </div>
    }
    </div>
  );
}

export default App;
