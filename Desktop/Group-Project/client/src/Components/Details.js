import React, { useState, useEffect, useRef }from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import ListGroup from 'react-bootstrap/ListGroup'
import styles from './Details.module.css';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from '../views/auth0secureapi';
import { useNavigate } from '@reach/router';
import AddComment from './addcomment';
import Target from "./target";
import Button from 'react-bootstrap/Button'

export default function PhotoPage(props) {
    const { user, isLoading, getAccessTokenSilently } = useAuth0();
    const { id, togallery, isnew }  = props;
    const [ photo, setPhoto ] = useState({});
    const [ editMode, setEditMode ] = useState(false);
    const [ commentloc, setCommentLoc ] = useState(null);
    const [ activecomment, setActiveComment ] = useState(null);
    const [diam, setDiam ] = useState(10);
    const [selection, setSelection ] = useState({ xloc: 0, yloc: 0, diam: 10, hidden: true });
    const [value, setValue] = React.useState(2);
    
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
                    .then(res => {
                        setPhoto({...res.photo[0], gallery_name: res.gallery_name, gallery_id: res._id});
                        for(const rating of res.photo[0].ratings) {
                            console.log("looking at", rating.user_id)
                            if(rating.user_id === user.sub) {
                                setValue(rating.rating);
                                break;
                            }
                        }
                    })
                    .catch(err => console.log(err));
            }
        }
        
    },[isLoading]);

    const clickEdit = () => {
        if(editMode) {
            let postpath = isnew ? "add/" + togallery : "update/" + id
            auth0SecureAPI(getAccessTokenSilently, "photos/" + postpath, photo)
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }

    const mouseUp = (event) => {
        if(!selection.hidden) {
            imagebox = (image.current.getBoundingClientRect());
            let xpct = Math.round((selection.xloc - imagebox.left + window.pageXOffset) / imagebox.width * 100);
            let ypct = Math.round((selection.yloc - imagebox.top + window.pageYOffset) / imagebox.height * 100);
            let diampct = diam / imagebox.width * 100;
            setCommentLoc( {
                ...selection,
                xpct: xpct,
                ypct: ypct,
                diam: diam,
                diampct: diampct
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

    const setMyRating = (newrating) => {
        console.log(photo);
        let found = false;
        let temp_photo = { ...photo,
            ratings: photo.ratings.map(rating => {
                if(rating.user_id === user.sub) {
                    found = true;
                    return { 
                        ...rating,
                        rating: newrating
                    }
                } else {
                    return rating;
                }
            } )
            } 
        if(!found) {
            temp_photo = { ...temp_photo,
                ratings: [ ...temp_photo.ratings, {
                    rating: newrating,
                    user_id: user.sub
                } ] 
            }
        }
        setPhoto(temp_photo);
        auth0SecureAPI(getAccessTokenSilently, "photos/update/" + id, temp_photo)
        .catch(err => console.log(err));
    }
    return (
        <div className={styles.container}>
            <h1 class="UserName">Picture Name Goes Here</h1>
            <div ref={imgcontainer} id="img_container" name="imagecontainer" onMouseDown={mouseDown} onMouseUp={mouseUp} onMouseMove={mouseMove}>
                <Target key="selector" xloc={selection.xloc} yloc={selection.yloc} diam={diam} active={true} hidden={selection.hidden}/>
                <img onLoad={() => setActiveComment(27)} src={photo.path} ref={image}  alt="User submitted with comments"/>
                { photo.comments && photo.comments.map((comment) => {
                    imagebox = (image.current.getBoundingClientRect());
                    const xloc = (comment.x / 100 * imagebox.width) + imagebox.left + window.pageXOffset;
                    const yloc = (comment.y / 100 * imagebox.height) + imagebox.top + window.pageYOffset;
                    const showdiam = (comment.diam / 100 * imagebox.width);
                    const onClick = () => {
                        setActiveComment(comment._id)
                    }
                    return (
                        <>
                            <Target key={comment._id} onClick={(event) => {
                                event.stopPropagation();
                                onClick();
                                }} xloc={xloc} yloc={yloc} diam={showdiam} active={(activecomment === comment._id)} hidden={false}/>
                        </>
                    )
                })}
            </div>
            <div className="star">
                <Box component="fieldset" mb={3} borderColor="transparent">
                    <Rating
                        name="simple-controlled"
                        value={value}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                            setMyRating(newValue);
                        }}
                    />
                </Box>
            </div>
            
            <Button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</Button>
            <form className={!editMode ? " " + styles.invisible : styles.floating }>
                <input type="text" name="path" value={photo.path} onChange={(e) => setPhoto( {...photo, path: e.target.value} ) } />
                <Button onClick={() => setEditMode(false)}>Cancel</Button>
            </form>
            <AddComment comment={activecomment} setActiveComment={setActiveComment} commentloc={commentloc} setCommentLoc={setCommentLoc} photo={photo} setPhoto={setPhoto} id={id} />
            <h5>Ratings</h5>
            <ListGroup>
                <ListGroup.Item>
                { photo.ratings && photo.ratings.map((rating) => {
                    return (
                        <p>{rating.user_id} - {rating.rating}</p>
                    )
                })}
                </ListGroup.Item>
            </ListGroup>
            
            <h5>Comments</h5>
            <ListGroup>
                <ListGroup.Item>
                    { photo.comments && photo.comments.map((comment) => {
                        return (
                            <>
                                <p>{`${comment.user_id} (${comment.x}, ${comment.y}) - ${comment.comment}`}</p>
                            </>
                        )
                    })}
                </ListGroup.Item>
            </ListGroup>
            <button onClick={() => Navigate("/gallery/" + photo.gallery_id)}>Go back to gallery!</button>
        </div>
    );
}