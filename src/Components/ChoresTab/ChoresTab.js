import React, {useEffect, useState} from 'react';
import $ from 'jquery';
import TodoChoreList from './TodoChoreList';
import CompleteChore from './CompleteChore';
import NewChoreModal from './NewChoreModal';
import '../../Stylesheets/chores.css';
import * as colors from "../../colors";
import ReactConfetti from 'react-confetti';

function ChoresTab(props) {

    const [todoList, setTodoList] = useState([]);
    const [todoneList, setTodoneList] = useState([]);
    const [modalVisible, toggleVisiblity] = useState(false);
    const debugMode = false;

    useEffect(fetchToDo, [props.refreshCounter]);

    const pageStyle = {
        backgroundColor: colors.light2,
        marginLeft: 50,
        marginRight: 50
    };

    function fetchToDo() {
        $.get('/fetchcompletechores')
        .done(function (response) {
            setTodoneList(response.data.map(function(d) {
                return <CompleteChore key={d._id} item ={d} currentUser={props.user} triggerRefresh={props.triggerRefresh} pageList={props.pageList} addPage={props.addPage} setClickedUser={props.setClickedUser} setActive={props.setActive} />
            }));
        });
        $.get('/fetchchores')
        .done(function (obj) {
          setTodoList(<TodoChoreList list={obj.data} currentUser={props.user} triggerRefresh={props.triggerRefresh}/>);
        })
        .fail(function (obj) {
          console.log(obj.responseText);
        });
    }

    function showModal() {
      toggleVisiblity(!modalVisible);
    }

    function deleteCompleteChores() {
            $.post('/deletecompletechores')
            .done(function(obj) {
              props.triggerRefresh();
            });
    }

    function renderEmpty() {
        if(todoList.length === 0) {
            return(<div className="completedChore" style={{hidden: true}}>
            </div>)
        }
    }

    return(
        <div style={pageStyle}>
            {props.setBgColor(colors.blue4)}
            <div style={{display: "inline-flex", padding: 16}}>
                <div style={{flex: 1}}>
                    {todoList}
                </div>
                <div style={{flex: 1}}>
                    {debugMode && <button onClick={deleteCompleteChores}>{"Delete Complete Chores"}</button>}
                    <h2 style={{textAlign: "center", verticalAlign: "center"}}>{"To Done List"}</h2>
                    <div style={{height: "280px", overflowY: "scroll"}}>
                        {renderEmpty()}
                        {todoneList}
                    </div>
                </div>
            </div>
            <div style={{backgroundColor:colors.dark2, padding: 5}}>
                <div onClick={showModal} style={{cursor: "pointer", backgroundColor: colors.green, width: "20%", textAlign: "center", marginLeft: "40%"}}>
                    <p style={{color: colors.light3, padding: 5}}>{"NEW CHORE"}</p>
                </div>
            </div>
                <NewChoreModal showModal={modalVisible} dismissModal={showModal} refreshChores={props.triggerRefresh}/>
        </div>
    );
}

export default ChoresTab;