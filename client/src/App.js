import React from 'react';
import {Router} from '@reach/router';
import Login from "./components/Login";
import UserForm from "./components/UserForm";
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Login path="/"/>
        <UserForm path="/register"/>
      </Router>
    </div>
  );
}

export default App;
