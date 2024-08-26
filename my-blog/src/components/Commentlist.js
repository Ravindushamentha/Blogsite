import React from 'react';
import './Commentlist.css';

const Commentlist = ({ comments }) => (
  <div className="comment-list">
    <h3>Comments:</h3>
    {comments.map((comment, index) => (
      <div className="comment" key={index}>
        <h4>{comment.postedBy}</h4>
        <p>{comment.text}</p>
      </div>
    ))}
  </div>
);

export default Commentlist;