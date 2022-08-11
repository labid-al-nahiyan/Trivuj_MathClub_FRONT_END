import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Comments from '../Comments/Comments';
import './PostCard.css'

const PostCard = () => {
    const [date,setDate] = useState(Date().toLocaleString())
    const [comment,setComment] = useState(false);
    return (
        <div>
            <div className='postCard-container'>
                <div className='post-header'>
                    <h4>Labid Al Nahiyan</h4>
                    <small style={{fontWeight:'100'}}>{date}</small>
                </div>
                <div className='post-description'>
                    <p>
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi facere temporibus repellat ad, porro vitae quod maiores eius ipsum labore nulla tempora, repudiandae sit rem ullam sed natus id at!
                        lorem1000
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
                
                   {comment?<Comments></Comments>:''} 
                
            </div>
        </div>
    );
};

export default PostCard;