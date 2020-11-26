import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import styles from './basicgallery.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import BasicPhoto from './basicphoto';


const BasicGallery = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id }  = props;
    const [ gallery, setGallery ] = useState({});
    const photoslist = gallery.photo ?? [];
    const [editMode, setEditMode ] = useState(false);
    
    useEffect(() => {
        if(!isLoading) {
            console.log("Retrieving galleries!");
            let temp_galleries = gallery;
            auth0SecureAPI(getAccessTokenSilently, "photos/gallery/" + id)
                .then(res => { 
                    temp_galleries = res;
                    setGallery(temp_galleries[0]);
                    console.log("Galleries:", temp_galleries);
                })
                .catch(err => console.log(err));

            
        }
    },[isLoading]);

    if (isLoading) {
        return (
            <div>Loading . .  . </div>
        )
    }

    
    return (
        <div className={styles.container}>
            <h2>{gallery.gallery_name}</h2>
            <p>Authorized Users: {gallery.authorized_user_ids}</p>
            <button onClick={()=> setEditMode(!editMode)}>{editMode ? "Save" : "Edit"}</button>
            <form className={!editMode ? " " + styles.invisible : styles.floating }>
                <input type="text" name="name" value={gallery.gallery_name} />
                <label> Authorized Users: </label>
                <input type="text" name="name" value={gallery.authorized_user_ids} />
            </form>

            { photoslist && photoslist.map((photo) => {
                return(
                    <BasicPhoto photo={photo} />
                )
                })}
        </div>
    )
} 

export default BasicGallery;

/*
<h5>{photo.path} - {photo._id}</h5>
                        <p>Photo Count: {gallery.photo.length}</p>
                        {photo.ratings && photo.ratings.map((rating) => {
                            return (<p>{rating.user_id} - {rating.rating}</p>);
                        })}
                        */