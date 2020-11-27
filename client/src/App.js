import React from 'react';
import {Router} from '@reach/router';
import BasicLogin from "./components/basiclogin";
//import UserForm from "./components/UserForm";
import './App.css';
import AuthRoutes from "./components/authroutes";

function App() {
  return (
    <div className="App">
      <Router>
        <BasicLogin path="/"/>
        <AuthRoutes path="/*" />
      </Router>
    </div>
  );
}

export default App;
