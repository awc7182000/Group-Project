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

const Galleries = (props) => {
    const { isLoading, user, getAccessTokenSilently } = useAuth0();
    const [ galleries, setGalleries ] = useState([]);
    const Navigate = useNavigate();
    //const user = { name: "Someone"};
    //const isLoading = false;
    
    useEffect(() => {
        if (!isLoading) {
            console.log("Retrieving galleries!");
            let temp_galleries = galleries;
            auth0SecureAPI(getAccessTokenSilently, "photos/owner/123")
                .then(res => {
                    temp_galleries = res;
                    setGalleries(temp_galleries);
                    console.log("Galleries:", temp_galleries);
                })
                .catch(err => console.log(err));
        }
    }, [isLoading]);

    return (
        <div className="Main" style={{ width: "auto" }}>
            <h1 class="UserName">{user.name}</h1>
            <Button onClick={navigate.bind(this, '/gallery/new')}>Add gallery!</Button>
            <CardDeck>
                {galleries && galleries.map(gallery => (
                    <Card>
                        <Card.Img variant="top" src={gallery.photo[0] && gallery.photo[0].path} />
                        <Card.Title>{gallery.gallery_name}</Card.Title>
                        <Card.Body>
                            <Card.Title>{gallery.title}</Card.Title>
                            <p>Photos: {gallery.photo.length}</p>
                        </Card.Body>
                        <Card.Footer>
                            <Button onClick={navigate.bind(this, '/gallery/' + gallery._id)}>View Gallery</Button>
                        </Card.Footer>
                    </Card>
                ))}
            </CardDeck>
        </div>
    )
}

export default Galleries;