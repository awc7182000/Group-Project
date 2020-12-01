import React from "react";
import {Link} from "@reach/router";
import { useAuth0 } from '@auth0/auth0-react';
import styles from "./login.module.css"; 

const Login = () => {
    const { loginWithRedirect,logout } = useAuth0();

    return (
        <div className={styles.login}>
            <div className={styles.buttons}>
                <h1 className={styles.title}>Welcome to Photoly or SnapCap!</h1>
                <button type='button' onClick={() => loginWithRedirect()} className={styles.register}>Login or Register</button>
                <button type='button' onClick={() => logout()} className={styles.logout}>Logout</button>
            </div>
        </div>
    )
}

export default Login;