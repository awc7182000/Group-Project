import React, { useState, useEffect } from 'react';
import styles from './basicphotopage.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import AddComment from './basicaddcomment';

const BasicPhotoPage = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id }  = props;
    const [ photo, setPhoto ] = useState({});
    const [editMode, setEditMode ] = useState(false);
    const [ addcommenthidden, setAddCommentHidden ] = useState(true);


    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading) {
            auth0SecureAPI(getAccessTokenSilently, "photos/" + id)
                .then(res => setPhoto({...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id}))
                .catch(err => console.log(err));
        }
    },[isLoading]);

    const clickEdit = () => {
        if(editMode) {
            auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, photo)
                .then(res => alert("Changes saved!"))
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }

    if (isLoading) {
        return (
            <div>Loading . .  . </div>
        )
    }

    if( !isAuthenticated) {
        return (
            <div> 
                <h2>Not logged in!</h2>
                <p>You must be logged in to view this content.</p>
            </div>
        )
    }

    if(typeof(photo) === "undefined") {
        //new photo
        setEditMode(true);
        return(
            <div className={styles.container}>
                <img src={photo.path} alt="User submitted with comments"/>
                <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
                <form className={!editMode ? " " + styles.invisible : styles.floating }>
                    <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
                </form>
            </div>
        )
    }

    return ( isAuthenticated && 
        <div className={styles.container}>
            <img src={photo.path} alt="User submitted with comments"/>
            <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
            <form className={!editMode ? " " + styles.invisible : styles.floating }>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
            </form>
            <button type="button" onClick={()=>setAddCommentHidden(false)}>Add Comment</button>
            <AddComment ishidden={addcommenthidden} setIsHidden={setAddCommentHidden} photo={photo} setPhoto={setPhoto} id={id} />
            <h5>Ratings</h5>
            { photo.ratings && photo.ratings.map((rating) => {
                return (
                    <p>{rating.user_id} - {rating.rating}</p>
                )
            })}
            <h5>Comments</h5>
            { photo.comments && photo.comments.map((comment) => {
                return (
                    <p>{`${comment.user_id} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
                )
            })}
            <button onClick={() => Navigate("/gallery/" + photo.gallery_id)}>Go back to gallery!</button>
        </div>
    )
} 

export default BasicPhotoPage;

/*




<h5>{photo.path} - {photo._id}</h5>
                        <p>Photo Count: {gallery.photo.length}</p>
                        {photo.ratings && photo.ratings.map((rating) => {
                            return (<p>{rating.user_id} - {rating.rating}</p>);
                        })}
                        */