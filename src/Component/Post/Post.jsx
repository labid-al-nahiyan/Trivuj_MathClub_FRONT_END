import React, { useContext, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import './Post.css'
import { UserContext } from '../../App';
import PostCard from '../PostCard/PostCard';

const Post = () => {
    const [tag,setTag] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    
    const AllPost = ()=>{
        console.log('fileter')
        console.log(tag);
    }
    return (
        <div>
            <NavBar></NavBar>
            <h1>Posts</h1>
            <div className='post-container'>
                <div className='post-nav'>
                    <div className='post-nav-btns'>
                        <input type="button" value="All Posts" className="postBtn" />
                        <input type="button" value="My Posts" className="postBtn" />
                        <Link to='/addPost' className='postBtn' style={{textDecoration:'none'}}>Create a Post</Link> 
                    </div>
                </div>
                <div className='show-post'>
                    <PostCard></PostCard>
                </div>
            </div>
        </div>
    );
};

export default Post;