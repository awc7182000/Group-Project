import React from 'react';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import Capture from '../views/Pictures/Capture.PNG'
import ListGroup from 'react-bootstrap/ListGroup'

    export default function SimpleRating() {
        const [value, setValue] = React.useState(2);

        var test= [{title:"Andrew/Michaela",comments:["looks great!","amazing","woah"],id:0}, {title:"John/Jane", comments:["Looks like Shit","why...just why", "OMG"], id:1}]

return (
    <div className="Look">
        <h1 class="UserName">Picture File Name.jpg</h1>
            <img class="View" src={Capture} alt="pic"/>
            <br/>
            <div className="star">
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating
          name="simple-controlled"
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
        />
      </Box>
      </div>
    <ListGroup>
        <ListGroup.Item></ListGroup.Item>
    </ListGroup>
    </div>
  );
}