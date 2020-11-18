import React, {useState} from "react";
import {Link, navigate} from "@reach/router";
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { loginWithRedirect }= useAuth0();

    return (
        <div>
             <h1>Welcome!</h1>
             <form className="col-md-6" style={{display: "inline-block"}}>
                        <div className="form-group">
                            <label for="username">Username:</label>
                            <input type="text" name="username" className="form-control"/>
                        </div>
                        <div className="form-group">
                            <label for="password">Password:</label>
                            <input type="text" name="password" className="form-control"/>
                        </div>
                        <button type="sumbit" className="btn btn-primary" style={{marginBottom: '10px'}}>Login</button>
                    </form>
        </div>
    )
}

export default Login;