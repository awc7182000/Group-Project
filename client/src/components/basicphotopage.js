import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './basicphotopage.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import BasicPhoto from './basicphoto';
import { useNavigate } from '@reach/router';

const BasicPhotoPage = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id }  = props;
    const [ photo, setPhoto ] = useState({});
    const [editMode, setEditMode ] = useState(false);
    
    const Navigate = useNavigate();

    useEffect(() => {
        if(!isLoading) {
            console.log("Retrieving photo!");
            auth0SecureAPI(getAccessTokenSilently, "photos/" + id)
                .then(res => { 
                    console.log("Result: ", res);
                    setPhoto({...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id});
                })
                .catch(err => console.log(err));
        }
    },[isLoading]);

    const clickEdit = () => {
        console.log("Photo Object", photo)
        

        auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, photo)
            .then(res => { 
                console.log("Result: ", res);
                setPhoto({...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id});
            })
            .catch(err => console.log(err));
        setEditMode(!editMode);
        
    }

    if (isLoading || typeof(photo) === "undefined") {
        return (
            <div>Loading . .  . </div>
        )
    }

    return (
        <div className={styles.container}>
            <img src={photo.path} alt="Image with comments"/>
            <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
            <form className={!editMode ? " " + styles.invisible : styles.floating }>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
            </form>
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