import { Link, navigate } from '@reach/router'
import Card from 'react-bootstrap/Card'
import Capture from './Pictures/Capture.PNG'
import React, { useState, useEffect } from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
import { useNavigate } from '@reach/router';
import { useAuth0 } from '@auth0/auth0-react';
import auth0SecureAPI from './auth0secureapi';

export default (props) => {
    const { isLoading, user,getAccessTokenSilently } = useAuth0();
    const [gallery, setGallery] = useState([]);
    const Navigate = useNavigate();
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


    return (
        <div className="Main" style={{ width: "auto" }}>
            <h1 class="UserName">User: {user.name}</h1>
            <h2 class="UserName">Gallery: {gallery.gallery_name}</h2>
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
                            <Button onClick={navigate.bind(this, '/Detail/' + photo._id)}>Card Link</Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardDeck>
        </div>
    )
}