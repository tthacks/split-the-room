import React, {useEffect, useState} from 'react';
import TodoChore from './TodoChore';
import CompleteChore from './CompleteChore';
import NewChoreModal from './NewChoreModal';
import '../../Stylesheets/chores.css';
import * as colors from "../../colors"

function ChoresTab(props) {

    const [todoList, setTodoList] = useState([]);
    const [todoneList, setTodoneList] = useState([]);
    const [modalVisible, toggleVisiblity] = useState(false);

    useEffect(fetchToDo, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light2,
        marginLeft: 50,
        marginRight: 50
    };

    function fetchToDo() {
        
    const chores = [{name: "bring honor to your family name", lastCompleted: "10/30/2020"}, {name: "Attend water aerobics at the senior center", lastCompleted: "11/20/2020"}, {name: "Fight the concept of time", lastCompleted: "11/20/2020"}];
    const completeChores = [{user: "yellow", name: "pick the fish up from fish camp"}, {user: "red", name: "fight the mummy"}, {user: "green", name: "become the mummy"}];
        setTodoList(chores.map( function(d) {
            return <TodoChore name={d.name} lastCompleted={d.lastCompleted}/>
        }));
        setTodoneList(completeChores.map(function(d) {
            return<CompleteChore user={d.user} name={d.name}/>
        }));
    }

    function showModal() {
      toggleVisiblity(!modalVisible);
    }

    return(
        <div style={pageStyle}>
            <div style={{display: "inline-flex", padding: 16}}>
                <div style={{flex: 1}}>
                    <h2>{"To-Do List"}</h2>
                    <div style={{height: "280px", overflowY: "scroll", marginRight: "20px"}}>
                    {todoList}
                    </div>
                    <div className="markCompleteDelete">
                        <button id="complete-button">{"MARK COMPLETE"}</button>
                        <button id="delete-button">{"DELETE CHORE"}</button>
                    </div>
                </div>
                <div style={{flex: 1}}>
                    <h2>{"To-Done List"}</h2>
                    <div style={{height: "280px", overflowY: "scroll"}}>
                    {todoneList}
                    </div>
                </div>
            </div>
            <div style={{backgroundColor:colors.dark2, padding: 5}}>
                <div onClick={showModal} style={{backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                    <p style={{color: colors.light3, padding: 5}}>{"NEW CHORE"}</p>
                </div>
            </div>
                <NewChoreModal />
        </div>
    );
}

export default ChoresTab;