import React, { useState, useEffect } from 'react';
import moment from 'moment';
import shortenNumber from '../../utils/shortenNumber';
import './Post.css';
import { fetchComments } from '../Comment/commentSlice';
import { useDispatch, useSelector } from 'react-redux';
import Comment from '../Comment/Comment';
import { getComments } from '../Comment/commentSlice';

export const Post = (props) =>
{  
    const dispatch = useDispatch()
    const { post } = props;
    const comments = useSelector(state => getComments(state, post.id));
    console.log(comments)
    const [showComments, setShowComments] = useState(false);
    const onToggleComments = (permalink, id) => {
        if (!showComments) {
           dispatch(fetchComments({permalink, id}));
           setShowComments(true);
        } else {
           setShowComments(false);
        }
     };
    return (
        <article key={post.id}>
            <div className="post-container"
                onClick={() => onToggleComments(post.permalink, post.id)}
            >
                    {post.preview ? (
                        <img 
                            src={post.url} 
                            alt="" 
                            className="post-image" 
                            aria-label="Show comments"
                        />
                    ) : (
                        <img 
                            src='/Visual Elements/NoImage.svg' 
                            alt="" 
                            className="post-image"
                            aria-label="Show comments"
                        />
                    )}
                    <div className='description-container'>
                        <h2>{post.title}</h2>
                        <div className='description'>
                            <span>{post.author}</span><br />
                            <span>{moment.unix(post.created_utc).fromNow()}</span><br />
                            <span>{post.ups}</span><br />
                            <span>
                                {shortenNumber(post.num_comments, 1)}
                            </span>
                        </div>
                    </div>
            </div>
            {showComments && comments && (
                        <div className="comments-section">
                            {comments.comments.map((comment) => (
                                <Comment comment={comment} key={comment.id} />
                            ))}
                        </div>
                    )}
        </article>
    );
}