import React, { useState, useEffect } from 'react';
import { useAuth0 } from '@auth0/auth0-react';


const Profile = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    
    if (isLoading) {
        return (
            <div>Loading . .  . </div>
        )
    }


    
    return (
        isAuthenticated && (
            <div>
                <h2>{user.name} - {user.user_id}</h2>\
                <p>{user.email}</p>
            </div>
        )
    )
    

}

export default Profile;
