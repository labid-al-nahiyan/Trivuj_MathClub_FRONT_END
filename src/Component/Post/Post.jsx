import React, { useContext, useState } from 'react';
import NavBar from '../NavBar/NavBar';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import './Post.css'
import { UserContext } from '../../App';
import PostCard from '../PostCard/PostCard';
import { useEffect } from 'react';

const Post = () => {
    const [tag,setTag] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [posts,setPosts] = useState([]);
    // const [postUpdate,setPostUpdate] = useEffect('');
    let navigate  = useNavigate();
    let location = useLocation();
    
    const AllPost = ()=>{
        console.log('fileter')
        console.log(tag);
    }
    useEffect(()=>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:3010/post/getPost');
            const data = await res.json();
  
            setPosts(data);
            return data;
          }
  
        
          // call the function
           fetchData()
            // make sure to catch any error
            .catch(console.error);
        
    },[])


    const handleMyPost=async()=>{
        const user ={
            poster_id : loggedInUser.ID
        }
        console.log(user);

        try {
            const res = await fetch('http://localhost:3010/post/getMyPost', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            
            const data = await res.json()  
            
            console.log(data)
        //     if(data.length === 0){
        //    //     setPostUpdate('NO Post Found')
        //     }
        //     else{
                setPosts(data)
                console.log(data);                
                navigate(location?.state?.from || '/post', {replace:true})
           // }
   
        } catch (error) {
            console.log(error);
        }
    }
    const handleAllPost=()=>{
        const fetchData = async () => {
            const res = await fetch('http://localhost:3010/post/getPost');
            const data = await res.json();
  
            setPosts(data);
            console.log(data);
            return data;
          }
  
        
          // call the function
           fetchData()
            // make sure to catch any error
            .catch(console.error);
        
    }
    return (
        <div>
            <NavBar></NavBar>
            <h1>Posts</h1>
            <div className='post-container'>
                <div className='post-nav'>
                    <div className='post-nav-btns'>
                        <input type="button" value="All Posts" className="postBtn" onClick={handleAllPost}/>
                        <input type="button" value="My Posts" className="postBtn" onClick={handleMyPost}/>
                        <Link to='/addPost' className='postBtn' style={{textDecoration:'none' }}>Create a Post</Link> 
                    </div>
                </div>
                <div className='show-post'>   
                    {
                        posts.map((post)=>{
                            return <PostCard post={post}></PostCard>
                        })
                    }
                </div>
            </div>
        </div>
    );
};

export default Post;