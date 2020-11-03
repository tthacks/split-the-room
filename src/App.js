import React, {useState} from 'react';
import MessageTab from './Components/MessageTab';
import FinanceTab from './Components/FinanceTab';
import ChoresTab from './Components/ChoresTab';
import TabHeader from './Components/TabHeader';

function App() {

  const houseName = "Hokie Haus";
  //const currentlyActive = 0; //0 is messages, 1 is finances, 2 is chores
  const [currentlyActive, setActive] = useState(0);

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
    <div>
    <h1 style={{color:"#eb5757", fontSize: 64, paddingLeft: 15}}>{houseName}</h1>
    <div style={{paddingLeft: 30}}>
      <TabHeader active={currentlyActive} />
      {currentTab()}
    </div>
    </div>
  );
}

export default App;
