import React, {useState} from 'react';
import MessageTab from './Components/MessageTab';
import FinanceTab from './Components/FinanceTab';
import ChoresTab from './Components/ChoresTab';
import TabHeader from './Components/TabHeader';
import SplashScreen from './Components/SplashScreen';
import * as colors from './colors';

function App() {

  //const currentlyActive = 0; //0 is messages, 1 is finances, 2 is chores
  const [refresh, triggerRefresh] = useState(0);
  const [currentlyActive, setActive] = useState(0);
  const [isSignedIn, signIn] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [houseName, setHouseName] = useState("The Hokie Haus");

  function refreshView() {
    triggerRefresh(refresh + 1);
  }

  function logInUser(username) {
    setCurrentUser(username);
  }

  return (
    <div>
      {!isSignedIn && <SplashScreen allowAccess={signIn} setUser={logInUser}/>}
      {isSignedIn && <div>
    <h1 style={{color: colors.light3}}>{houseName}</h1>
    <div>
      <TabHeader active={currentlyActive} setActive={setActive}/>
      {currentlyActive === 0 && <MessageTab user={currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 1 && <FinanceTab user = {currentUser} triggerRefresh={refreshView} refreshCounter={refresh}/>}
      {currentlyActive === 2 && <ChoresTab triggerRefresh={refreshView} refreshCounter={refresh}/>}
      
    </div>
    </div>
    }
    </div>
  );
}

export default App;
