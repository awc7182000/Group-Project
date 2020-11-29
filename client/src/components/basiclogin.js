import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styles from "./basiclogin.module.css";
import {Link} from '@reach/router';

const BasicLogin = props => {
    const { loginWithRedirect } = useAuth0();

    return(
        <div className="container">
            <span className={styles.login}>
                <button onClick={() => loginWithRedirect()} className="btn btn-primary" style={{borderRadius: "7px"}}>Log In</button>
                <Link to="/register">Not a member? Register</Link>
            </span>
        </div>   
    )
}

export default BasicLogin;
