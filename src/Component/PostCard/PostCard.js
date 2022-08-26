import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import './PostCard.css'

const PostCard = ({post}) => {
    const [date,setDate] = useState(Date().toLocaleString())
    const [comment,setComment] = useState(false);
    const {ID,POSTER_ID,NAME,TITLE,DESCRIPTION,POSTDATE} = post
    return (
        <div>
            <div className='postCard-container'>
                <div className='post-header'>
                    <h4>{NAME}</h4>
                    <small style={{fontWeight:'100'}}>{POSTDATE}</small>
                </div>
                <div className='post-title'>
                    <h3>{TITLE}</h3>
                </div>
                <div className='post-description'>
                    <p>
                        {DESCRIPTION}
                    </p>
                </div>
                <div className='post-footer'>
                    <div className='post-vote'>
                        <p>Vote</p>
                    </div>
                    <div className='post-comment'>
                        <input type='button' id='post-comment-link' value='comment' onClick={()=>setComment(!comment)}></input>
                    </div>
                </div>
                {comment?<Comments postId = {ID}></Comments>:''} 
                
            </div>
        </div>
    );
};

export default PostCard;