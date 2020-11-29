import {Link,navigate} from '@reach/router'
import Card from 'react-bootstrap/Card'
import Capture from './Pictures/Capture.PNG'
import React, {useState,useEffect} from 'react'
import ListGroup from 'react-bootstrap/ListGroup'
import Button from 'react-bootstrap/Button'
import CardDeck from 'react-bootstrap/CardDeck'
    
export default(props) => {

    const[title,setTitle] = useState([]);

    var test= [{title:"Andrew/Michaela",comments:["looks great!","amazing","woah"],id:0}, {title:"John/Jane", comments:["Looks like Shit","why...just why", "OMG"], id:1}]


    return(
        <div className="Main"style={{width:"auto"}}>
            <h1 class="UserName">UserName</h1>
            <CardDeck>
                {test.map(t => (
  <Card>
    <Card.Img variant="top" src={Capture} />
    <Card.Body>
        <Card.Title>{t.title}</Card.Title>
        {t.comments.map(c => (
            <ListGroup variant="flush">
        <ListGroup.Item>-{c}</ListGroup.Item>
  </ListGroup>
        ))}
    </Card.Body>
    <Card.Footer>
<Button onClick={navigate.bind(this,'/Detail/'+t.id)}>Card Link</Button>
    </Card.Footer>
  </Card>
  ))}
</CardDeck>
        </div>
    )
}