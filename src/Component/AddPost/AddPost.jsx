import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useLocation, useNavigate } from 'react-router-dom';
import NavBar from '../NavBar/NavBar';
import './AddPost.css'
import { useEffect } from 'react';
import moment from 'moment';

const AddPost = () => {


    const [loggedInUser, setLoggedInUser] = useContext(UserContext)
    const [addPost,setAddPost] = useState([]);
    let navigate  = useNavigate();
    let location = useLocation();


    
    useEffect(()=>{
        const newAdd = { ...addPost }
        newAdd['organizerID'] = loggedInUser?.ID;
        // newAdd['uploadTime'] = moment().format('hh:mm a,DD MMM YYYY')

        
        setAddPost(newAdd)
    },[])
    const handleChange = (event)=>{

        console.log(event.target.name , event.target.value);
        const newAdd = { ...addPost }
            newAdd[event.target.name] = event.target.value;
            setAddPost(newAdd)
    }

    const handleSubmit = (event)=>{
        event.preventDefault();

        console.log(addPost);  
        
        const fetchData = async () => {
            const res = await fetch('http://localhost:3010/post/create', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(addPost)
                });
            const data = await res.json();
            console.log(data);
            navigate('/post')
          }

          fetchData()
          .catch (error=>{
            console.log(error)
          })
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className='addPost-container'>
                <div>

                </div>
                <div className='addPost-form'>
                    <div className='post-head'>
                        <h2>Ask a Question </h2>
                        <hr />
                    </div>

                    <div className='form'>
                        
                        <form action="" className='addPost-form'>
                            <label htmlFor="title"><h3>Title</h3> </label>
                            <input type="text" name="title" id="title" onChange={handleChange}  placeholder='Enter Title' required/>
                            
                            <label htmlFor="area"><h3>Description</h3> </label>
                            <textarea name="description" id="area" cols="100" rows="5" placeholder='Describe Your question in details (in 1000 words)' onChange={handleChange} required></textarea>
                            
                            <input type="submit" value="Submit" className='createpostBtn' onClick={handleSubmit} />
                        </form>
                    </div>
                </div>
                <div>
                  
                </div>
            </div>
        </div>
    );
};

export default AddPost;