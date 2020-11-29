import React from "react";
import {Link} from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';

const Login = () => {
    const { loginWithRedirect,logout } = useAuth0();

    return (
        <div>
            <button type='button' onClick={() => loginWithRedirect()}>Login or Register.</button>
            <button type='button' onClick={() => logout()}>Logout</button>
        </div>
    )
}

export default Login;