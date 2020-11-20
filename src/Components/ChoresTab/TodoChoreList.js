import React, { useEffect, useState } from 'react';
import $ from 'jquery';
import "../../Stylesheets/chores.css";

function TodoChoreList(props) {

    const [displayedList, setDisplayedList] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);

    useEffect(renderDisplayedList, [props.list, props.user, props.triggerRefresh]);

    function addToCheckedList(e) {
        if(e.target.checked) {
            selectedItems.push(e.target.id);
            setSelectedItems(selectedItems);
        }
        else {
            let idx = selectedItems.indexOf(e.target.id);
            if(idx > -1) {
            selectedItems.splice(idx, 1);
            }
            setSelectedItems(selectedItems);
        }
    }

    function manageCompleted() {
        let date = new Date().toDateString();
        for(let x = 0; x < selectedItems.length; x++) {
            let updated;
            if(props.list.find(element => element._id === selectedItems[x]).recurrence === "false") {
                updated = {_id: selectedItems[x],
                isDeleted: true,};
            }
            else {
                 updated = {
                _id: selectedItems[x], 
                lastCompleted: date,
                };
            }
            let completed = {
                user: props.currentUser,
                name: props.list.find(element => element._id === selectedItems[x]).name,
                isDeleted: false,
            }
            $.post('/updatechore', updated, function() {
                $.post('/newcompletechore', completed, function() {
                    setSelectedItems([]);
                    props.triggerRefresh();
                });
            });
        }
    }

    function deleteSelected() {
        // eslint-disable-next-line no-restricted-globals
        if(confirm("Are you sure you want to delete these chores?")) {
        for(let x = 0; x < selectedItems.length; x++) {
            let updated = {
                _id: selectedItems[x], 
                isDeleted: true,
            }
            $.post('/updatechore', updated, function() {
                    props.triggerRefresh();
            });
        }
    }
    }
    
    function renderDisplayedList() {
        setDisplayedList(props.list.map(function(d) {
            if(d.lastCompleted !== null) {
            return(<div className="todoitem">
            <input type="checkbox" id={d._id} onChange={addToCheckedList} defaultChecked={false}></input>
        <h3>{d.name}</h3>
        <p>{"Last Completed: " + d.lastCompleted}</p>
        </div>);
            }
            else return null;
    }));
}

    return(<div>
            <h2>{"To Do List"}</h2>
        <div style={{height: "280px", width: "100%", overflowY: "scroll"}}>
        {displayedList}
        </div>
        <div className="markCompleteDelete">
            <button id="complete-button" onClick={manageCompleted}>{"MARK COMPLETE"}</button>
            <button id="delete-button" onClick={deleteSelected}>{"DELETE CHORE"}</button>
        </div>
    </div>);
}
export default TodoChoreList;