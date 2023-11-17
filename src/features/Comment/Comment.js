import React from 'react';
import moment from 'moment';
import './Comment.css';

const Comment = (props) => {
    const { comment } = props;
    console.log(comment)
    return (
      <div className="comment">
        <div className="author">
          <img 
            src={`https://robohash.org/${comment.author}`}
            alt={`${comment.author} profile`}
            className='avatar'
          />
          <p>{comment.author}</p>
        </div>
        <div className="body">
          <p>{comment.body}</p>
        </div>
        <div className="additional-info">
          <div className="up-votes">
            <img 
              src='/Visual Elements/UpVoteIcon.svg'
            />
            <p>{comment.ups}</p>
          </div>
          <div className="comments-nr">
            <img
            src='/Visual Elements/TimeAgo.png'
            />
            <p>{moment.unix(comment.created_utc).fromNow()}</p>
          </div>          
        </div>
      </div>
    );
  };

export default Comment;