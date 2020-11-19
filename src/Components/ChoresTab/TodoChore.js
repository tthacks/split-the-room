import React from 'react';
import "../../Stylesheets/chores.css";

function TodoChore(props) {
    const lastCompleted = props.lastCompleted === "" ? "never": props.lastCompleted;

return(<div className="todoitem">
    <input type="checkbox"></input>
<h3>{props.name}</h3>
<p>{"Last Completed: " + lastCompleted}</p>
</div>);
}

export default TodoChore;