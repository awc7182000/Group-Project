import React, { useState } from 'react';
import styles from './basicaddcomment.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';


const AddComment = props => {
    const { id, photo, setPhoto, ishidden, setIsHidden } = props;
    const { user, getAccessTokenSilently } = useAuth0();
    const [ textvalue, setTextValue ] = useState("Enter text here . . . ")
    
    const saveComment = (comment) => {
        const temp_photo = {...photo, 
            comments: [
                ...photo.comments, 
                {
                    user_id: user.sub,
                    x: Math.round(Math.random()*100),
                    y: Math.round(Math.random()*100),
                    diam: Math.round(Math.random()*100),
                    comment: textvalue
                }
            ] };
        setPhoto(temp_photo);
        console.log("Saving photo", temp_photo);
        auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, temp_photo)
        .then(res => alert("Changes saved!"))
        .catch(err => console.log(err));
        
        setIsHidden(true);
        setTextValue("Enter text here . . . ");
    }
    return (
        <div className={ishidden ? styles.hidden : styles.addcomment}>
            <form name="AddComment">
                <textarea rows="4" cols="75" name="comment" value={textvalue} onChange={(e)=>setTextValue(e.target.value)}></textarea>
                <button type="button" onClick={saveComment}>Submit</button>
                <button type="button" onClick={() => { setTextValue("Enter text here . . . "); setIsHidden(true);;}}>Cancel</button>
            </form>
        </div>
    )
}

export default AddComment;
