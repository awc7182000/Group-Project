import React, { useState } from 'react';
import styles from './basicaddcomment.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import Target from './basictarget';

const AddComment = props => {
    const { id, photo, setPhoto, commentloc, setCommentLoc, setActiveComment } = props;
    const { user, getAccessTokenSilently } = useAuth0();
    const [ textvalue, setTextValue ] = useState("Enter text here . . . ")
    const { xloc, yloc, xpct, ypct, diam } = commentloc ?? {};

    const saveComment = (comment) => {
        const temp_photo = {...photo, 
            comments: [
                ...photo.comments, 
                {
                    user_id: user.sub,
                    x: xpct,
                    y: ypct,
                    diam: Math.round(Math.random()*100),
                    comment: textvalue
                }
            ] };
        setPhoto(temp_photo);
        console.log("Saving photo", temp_photo);
        auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, temp_photo)
        .then(res => alert("Changes saved!"))
        .catch(err => console.log(err));
        
        setCommentLoc(null);
        setTextValue("Enter text here . . . ");
        setActiveComment(null);
    }
    
    return (
        <>
            <Target xloc={xloc} yloc={yloc} diam={15} active={true} hidden={commentloc===null}/>
            <div className={commentloc ?  styles.addcomment : styles.hidden } 
                style={commentloc ? 
                    { 
                        position: "absolute",
                        top: yloc + 25,
                        left: Math.max(xloc - 300,0)
                    } : 
                    null }
                >
                
                <form name="AddComment">
                    <textarea rows="4" cols="75" name="comment" value={textvalue} onChange={(e)=>setTextValue(e.target.value)}></textarea>
                    <button type="button" onClick={saveComment}>Submit</button>
                    <button type="button" onClick={() => { setTextValue("Enter text here . . . "); setCommentLoc(null);;}}>Cancel</button>
                </form>
            </div>
        </>
    )
}

export default AddComment;
