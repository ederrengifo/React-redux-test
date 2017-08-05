import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

var initialState = {name: "Eder", role: "designer", project: "PICI", value: 0};
var store = createStore(step, initialState);

// actions
var CHANGE_NAME = "CHANGE_NAME"
var CHANGE_ROLE = "CHANGE_ROLE"
var CHANGE_PROJECT = "CHANGE_PROJECT"
var INCREMENT_COUNTER = "INCREMENT_COUNTER"
function changeName(name) {
  return {
    type: CHANGE_NAME,
    name: name,
  }
}
function changeRole(role) {
  return {
    type: CHANGE_ROLE,
    role: role,
  }
}
function changeProject(project) {
  return {
    type: CHANGE_PROJECT,
    project: project,
  }
}
function incrementCounter(increment) {
  return {
    type: INCREMENT_COUNTER,
    increment,
  }
}

// reducer
function step(prevState, action) {
  switch (action.type) {
    case CHANGE_NAME:
      return Object.assign({}, prevState, {name: action.name});
    case CHANGE_ROLE:
      return Object.assign({}, prevState, {role: action.role});
    case CHANGE_PROJECT:
      return Object.assign({}, prevState, {project: action.project});
    case INCREMENT_COUNTER:
      return Object.assign({}, prevState,{value: prevState.value + action.increment});
    default:
      return prevState;
  }
}

// state = step(state, changeName("Pedro"));
// state = step(state, changeRole("developer"));
// state = step(state, changeProject("Mighty"));

// Componentes

function Greeter({username, roleName, projectName, log}) {
  if (log) console.log("foo");
  return (<p> Hello {username}, you are a {roleName} and I'm working in {projectName}</p>);
}

function Counter({count}) { 
return (
    <div>
      Your score <span>{count}</span> !  
      <div>
        <button id="increment" onClick={() => { store.dispatch(incrementCounter(3)) }}>+</button>
        <button id="decrement">-</button>
      </div>
    </div>
  );
  }

var root = document.body.appendChild(document.createElement('div'))

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Greeter username={store.getState().name} roleName={store.getState().role} projectName={store.getState().project} />
      <Counter count={store.getState().value} />
    </div>
  </Provider>,
  root)
