import { useNavigate } from '@reach/router';
import React from 'react';
import styles from './basicphoto.module.css';


const BasicPhoto = props => {
    const { path, _id, ratings, comments } = props.photo;
    const Navigate = useNavigate();
    
    return (
        <div className={styles.small} onClick={() => Navigate("/photos/" + _id)}>
            <img src={path} alt="Image with comments"/>
            <h5>Ratings</h5>
            { ratings && ratings.map((rating) => {
                return (
                    <p>{rating.user_id} - {rating.rating}</p>
                )
            })}
            <h5>Comments</h5>
            { ratings && ratings.map((rating) => {
                return (
                    <p>{`${comments.user_id} (${ratings.x}, ${ratings.y}) - ${comments.comment}`}</p>
                )
            })}
        </div>
    )
}

export default BasicPhoto;
