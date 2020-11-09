import React, {useState} from 'react';
import MessageTab from './Components/MessageTab';
import FinanceTab from './Components/FinanceTab';
import ChoresTab from './Components/ChoresTab';
import TabHeader from './Components/TabHeader';
import SplashScreen from './Components/SplashScreen';
import * as colors from './colors';

function App() {

  const houseName = "Hokie Haus";
  //const currentlyActive = 0; //0 is messages, 1 is finances, 2 is chores
  const [currentlyActive, setActive] = useState(0);
  const [isSignedIn, signIn] = useState(false);

  function currentTab() {
    switch(currentlyActive) {
      case 0:
        return <MessageTab />;
      case 1:
        return <FinanceTab />;
      case 2:
      default: 
        return <ChoresTab />;
    }
  }

  return (
    <div className="App">
      {!isSignedIn && <SplashScreen allowAccess={signIn}/>}
      {isSignedIn && <div>
    <h1 style={{color: colors.light3}}>{houseName}</h1>
    <div>
      <TabHeader active={currentlyActive} setActive={setActive}/>
      {currentTab()}
    </div>
    </div>
    }
    </div>
  );
}

export default App;
