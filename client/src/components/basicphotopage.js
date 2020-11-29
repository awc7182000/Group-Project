import React, { useState, useEffect, useRef } from 'react';
import styles from './basicphotopage.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import { useNavigate } from '@reach/router';
import AddComment from './basicaddcomment';
import Target from "./basictarget";

const BasicPhotoPage = props => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const { id, togallery, isnew }  = props;
    const [ photo, setPhoto ] = useState({});
    const [ editMode, setEditMode ] = useState(false);
    const [ commentloc, setCommentLoc ] = useState(null);
    const [ activecomment, setActiveComment ] = useState(null);
    const [diam, setDiam ] = useState(10);
    const [selection, setSelection ] = useState({ xloc: 0, yloc: 0, diam: 10, hidden: true });
    
    const image = useRef(null);
    const imgcontainer = useRef(null);
    const Navigate = useNavigate();
    
    let imagebox;

    useEffect(() => {
        console.log("Is new:", isnew);
        if(!isLoading) {
            if(isnew) {
                setPhoto( {gallery_id: togallery} );
                setEditMode(true);
            } else {
                auth0SecureAPI(getAccessTokenSilently, "photos/" + id)
                    .then(res => setPhoto({...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id}))
                    .catch(err => console.log(err));
            }
        }
        console.log("Ran use effect");
    },[isLoading]);

    const clickEdit = () => {
        if(editMode) {
            let postpath = isnew ? "add/" + togallery : "update/" + id
            auth0SecureAPI(getAccessTokenSilently, "photos/" + postpath, photo)
                .then(res => alert("Changes saved!"))
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }

    const imageClick = (event) => {
        imagebox = (image.current.getBoundingClientRect());
        let xpct = Math.round((event.clientX - imagebox.left + window.pageXOffset) / imagebox.width * 100);
        let ypct = Math.round((event.clientY - imagebox.top + window.pageYOffset) / imagebox.height * 100);
        setCommentLoc( {
            xpct: xpct,
            ypct: ypct,
            xloc: event.clientX + window.pageXOffset,
            yloc: event.clientY + window.pageYOffset
        })
        setActiveComment(null);
    }

    const mouseUp = (event) => {
        if(!selection.hidden) {
            imagebox = (image.current.getBoundingClientRect());
            let xpct = Math.round((selection.xloc - imagebox.left + window.pageXOffset) / imagebox.width * 100);
            let ypct = Math.round((selection.yloc - imagebox.top + window.pageYOffset) / imagebox.height * 100);
            setCommentLoc( {
                ...selection,
                xpct: xpct,
                ypct: ypct,
                diam: diam
            })
            setActiveComment(null);
            setSelection({ xloc: 0, yloc: 0, diam: 10, hidden: true});
        }
    }

    const mouseMove = (event) => {
        if(!selection.hidden) { 
            event.preventDefault();
            const selectiondiam = Math.max(10, 2* Math.sqrt((event.clientX + window.pageXOffset - selection.xloc)**2 + (event.clientY + window.pageYOffset - selection.yloc)**2));
            setDiam(selectiondiam);
        }
    }

    const mouseDown = (event) => {
        const new_selection = {
            xloc: event.clientX + window.pageXOffset,
            yloc: event.clientY + window.pageYOffset,
            diam: diam,
            hidden: false
        };
        setSelection(new_selection);
        setDiam(10);
        setActiveComment(null);
    }


    if(typeof(photo) === "undefined") {
        //new photo
        console.log("New photo!");
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
            <div ref={imgcontainer} id="img_container" name="imagecontainer" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                <Target key="selector" xloc={selection.xloc} yloc={selection.yloc} diam={diam} active={true} hidden={selection.hidden}/>
                <img onLoad={() => setActiveComment(27)} src={photo.path} ref={image}  alt="User submitted with comments"/>
                { photo.comments && photo.comments.map((comment) => {
                    imagebox = (image.current.getBoundingClientRect());
                    const xloc = (comment.x / 100 * imagebox.width) + imagebox.left + window.pageXOffset;
                    const yloc = (comment.y / 100 * imagebox.height) + imagebox.top + window.pageYOffset;
                    const onClick = () => {
                        setActiveComment(comment._id)
                    }
                    return (
                        <>
                            <Target key={comment._id} onClick={(event) => {
                                event.stopPropagation();
                                onClick();
                                }} xloc={xloc} yloc={yloc} diam={comment.diam} active={(activecomment === comment._id)} hidden={false}/>
                        </>
                    )
                })}
            </div>
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
                return (
                    <>
                        <p>{`${comment.user_id} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
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