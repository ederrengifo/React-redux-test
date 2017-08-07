import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';

var initialState = {name: "Eder", role: "designer", project: "PICI", value: 0};
var store = createStore(step, initialState);

// actions
var CHANGE_NAME = "CHANGE_NAME"
var CHANGE_ROLE = "CHANGE_ROLE"
var CHANGE_PROJECT = "CHANGE_PROJECT"
var INCREMENT_COUNTER = "INCREMENT_COUNTER"
var DECREMENT_COUNTER = "DECREMENT_COUNTER"
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
function decrementCounter(decrement) {
  return {
    type: DECREMENT_COUNTER,
    decrement,
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
    case DECREMENT_COUNTER:
      return Object.assign({}, prevState,{value: prevState.value - action.decrement});
    default:
      return prevState;
  }
}

// state = step(state, changeName("Pedro"));
// state = step(state, changeRole("developer"));
// state = step(state, changeProject("Mighty"));

// Componentes

function Greeter({name, role, project, log}) {
  if (log) console.log("foo");
  return (<p> Hello {name}, you are a {role} and I'm working in {project}</p>);
}

function Counter({count, increment, decrement}) { 
  return (
    <div>
      Your score <span>{count}</span> !  
      <div>
        <button id="increment" onClick={increment}>+</button>
        <button id="decrement" onClick={decrement}>-</button>
      </div>
    </div>
  );
}

// Wrapper

function RootComponent({name, role, project, value, increment, decrement}) {
  return (
    <div>
      <Greeter name={name} role={role} project={project} />
      <Counter count={value} increment={increment} decrement={decrement} />
    </div>
  )
}

// Container (decorar)

const RootContainer = connect(
  (state) => {
    return {
      name: state.name,
      role: state.role,
      project: state.project,
      value: state.value
    }
  },  
  (dispatch) => { 
    return {
      increment: () => dispatch(incrementCounter(1)),
      decrement: () => dispatch(decrementCounter(2))
  }
})
(RootComponent);

// Render

var root = document.body.appendChild(document.createElement('div'))

ReactDOM.render(
  <Provider store={store}>
    <RootContainer />
  </Provider>,
  root)
