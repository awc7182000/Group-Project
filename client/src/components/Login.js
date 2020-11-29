import React, {useState} from "react";
import {Link, navigate} from "@reach/router";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loginWithRedirect } = useAuth0();
    const { logout } = useAuth0();

    return (
        <div className="container">
            <button type='button' onClick={() => loginWithRedirect()} className="btn btn-primary" style={{borderRadius: "7px"}}>Login</button>
            <button type='button' onClick={() => logout()}>Logout</button>
            <Link to="/register">Not a member? Register</Link>              
        </div>
    )
}

export default Login;