import React from 'react';
import ReactDOM from 'react-dom';

var state = {name: "Eder"}

// actioncs
var CHANGE_NAME = "CHANGE_NAME"
function changeName(name) {
  return {
    type: CHANGE_NAME,
    name: name,
  }
}

// reducer
function step(prevState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return Object.assign({}, prevState, {name: action.name});
    default:
      return prevState;
  }
}

state = step(state, changeName("Javier"));
// Componentes

function Greeter({username, log}) {
  if (log) console.log("foo");
  return (<p> Hello {username}</p>);
}

var root = document.body.appendChild(document.createElement('div'))
ReactDOM.render(<Greeter username={state.name} />, root)
