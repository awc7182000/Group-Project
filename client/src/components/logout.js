import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';

const LogOutButton = props => {
    const { logout } = useAuth0();

    return (
        <button onClick={() => logout({returntTo: "http://localhost:3000/" })}>Log Out</button>
    )
}

export default LogOutButton;