import { Link, navigate } from '@reach/router'
import Card from 'react-bootstrap/Card'
import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';
import styles from './gallery.module.css';

export default (props) => {
    const { isLoading, user,getAccessTokenSilently } = useAuth0();
    const [gallery, setGallery] = useState([]);
    const { id, isnew } = props;
    const [ editMode, setEditMode ] = useState(false);

    useEffect(() => {
        if(!isLoading ) {
            if(isnew) {
                setGallery({gallery_name:"New gallery . . . ", authorized_user_ids: "List authorized users . . . "});
                setEditMode(true);
            } else {
                auth0SecureAPI(getAccessTokenSilently, "photos/gallery/" + id)
                    .then(res => setGallery(res[0]))
                    .catch(err => console.log(err));   
            }
        }
    },[isLoading]);

    const clickEdit = () => {
        if(editMode) {
            let postpath = isnew ? "new" : "update/" + id
            const gallery_update = {
                gallery_name: gallery.gallery_name,
                authorized_user_ids: gallery.authorized_user_ids,
                owner_id: isnew ? "123" : gallery.owner_id
            }
            console.log(gallery_update);
            auth0SecureAPI(getAccessTokenSilently, "gallery/" + postpath, gallery_update)
                .catch(err => console.log(err));
        }
        setEditMode(!editMode);
    }

    return (
        <div className="Main" style={{ width: "auto" }}>
            <h1 class="UserName">User: {user.name}</h1>
            <h3>Gallery: {gallery.gallery_name}</h3>
            <Button onClick={navigate.bind(this, '/Detail/new/' + gallery._id)}>Add new photo!</Button>
            <Button onClick={navigate.bind(this, '/loggedin')}>Back to Galleries</Button>
            <Button onClick={clickEdit}>{editMode ? "Save" : "Edit"}</Button>
            <form className={ editMode ? styles.floating : styles.invisible }>
                <input type="text" name="name" value={gallery.gallery_name} onChange={(e) => setGallery({...gallery, gallery_name: e.target.value})}/>
                {/*<label> Authorized Users (separate by commas): </label>
                <input type="text" name="name" value={gallery.authorized_user_ids} onChange={(e) => setGallery({...gallery, authorized_user_ids: e.target.value.toString().split(",")})}/>
                */}
                <Button name="editformcancel" onClick={() => setEditMode(false)}>Cancel</Button>
            </form>
            <CardDeck>
                {gallery.photo && gallery.photo.length && gallery.photo.map(photo => (
                    <Card>
                        <Card.Img variant="top" src={photo.path} />
                        <Card.Body>
                            <Card.Title>Title Goes Here</Card.Title>
                            {photo.comments.length && photo.comments.map(comment => (
                                <ListGroup variant="flush">
                                    <ListGroup.Item>-{comment.comment}</ListGroup.Item>
                                </ListGroup>
                            ))}
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={navigate.bind(this, '/Detail/' + photo._id)}>View Photo</Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardDeck>
        </div>
    )
}