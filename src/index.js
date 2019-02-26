import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Todo from './components/Todo';

function App() {
  return (
    <div>
      <Todo />
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));


