import React, { useState, useEffect, useRef } from 'react';
import styles from './basicphotopage.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import AddComment from './basicaddcomment';
import Target from "./basictarget";

const BasicPhotoPage = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id }  = props;
    const [ photo, setPhoto ] = useState({});
    const [editMode, setEditMode ] = useState(false);
    const [ commentloc, setCommentLoc ] = useState(null);
    const [ activecomment, setActiveComment ] = useState(null);

    const image = useRef(null);

    const Navigate = useNavigate();
    let imagebox;

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

    const imageClick = (event) => {
        imagebox = (image.current.getBoundingClientRect());
        let xpct = Math.round((event.clientX - imagebox.left) / imagebox.width * 100);
        let ypct = Math.round((event.clientY - imagebox.top) / imagebox.height * 100);
        setCommentLoc( {
            xpct: xpct,
            ypct: ypct,
            xloc: event.clientX,
            yloc: event.clientY
        })
        setActiveComment(null);
    }

    if(typeof(photo) === "undefined") {
        //new photo
        setEditMode(true);
        return(
            <div className={styles.container}>
                <img src={photo.path} ref={image} alt="User submitted with comments" onClick={imageClick}/>
                <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
                <form className={!editMode ? " " + styles.invisible : styles.floating }>
                    <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
                </form>
            </div>
        )
    }

    return ( isAuthenticated && 
        <div className={styles.container}>
            <img src={photo.path} ref={image} onClick={imageClick} alt="User submitted with comments"/>
            <button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</button>
            <form className={!editMode ? " " + styles.invisible : styles.floating }>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
            </form>
            <AddComment comment={activecomment} setActiveComment={setActiveComment} commentloc={commentloc} setCommentLoc={setCommentLoc} photo={photo} setPhoto={setPhoto} id={id} />
            <h5>Ratings</h5>
            { photo.ratings && photo.ratings.map((rating) => {
                return (
                    <p>{rating.user_id} - {rating.rating}</p>
                )
            })}
            <h5>Comments</h5>
            { photo.comments && photo.comments.map((comment) => {
                imagebox = (image.current.getBoundingClientRect());
                const xloc = (comment.x / 100 * imagebox.width) + imagebox.left;
                const yloc = (comment.y / 100 * imagebox.height) + imagebox.top;
                const onClick = () => {
                    setActiveComment(comment._id)
                }
                return (
                    <>
                        <p>{`${comment.user_id} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
                        <Target key={comment._id} onClick={onClick} xloc={xloc} yloc={yloc} diam={comment.diam} active={(activecomment === comment._id)} hidden={false}/>
                    </>
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