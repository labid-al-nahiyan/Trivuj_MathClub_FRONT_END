import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../../App';
import './Comments.css'

const Comments = ({postId}) => {


    const [comments, setComments] = useState([])
    const [addComment, setAddComment]  = useState("");
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);

    
    useEffect(()=>{
        const postInfo = {
            postId : postId
        }
        const fetchData = async () => {
            const res = await fetch('http://localhost:3010/post/comment/get',{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postInfo) 
            });
            const data = await res.json();
  
            setComments(data);
            console.log(data)
            return data;
          }
           fetchData()
           .catch(console.error);
    },[])

    const handleChange = (e)=>{
        const newComment= e.target.value;
        console.log(newComment)
        setAddComment(newComment)
        
    }
    const handleSubmit = async()=>{
        console.log(addComment.length);

        const addCommentInfo = {
            addComment : addComment,
            userId : loggedInUser.ID,
            postId : postId
        }

        if(typeof addComment === 'string' && addComment.trim().length===0)console.log('EMPTY');
        else{
            
            console.log("NOT EMPTY")
            try {
                const res = await fetch('http://localhost:3010/post/comment/add', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(addCommentInfo)
                    })
                const data =await res.json();
                console.log(data)
                
            } catch (error) {
                console.log(error);
            }
        }
        
    }
    
    return (
        <div>
            <div className='comment-container'>
                {
                    comments.map((comment)=>{
                        return <div className='single-comment'>
                                <div className='commentor'>
                                    <p style={{fontWeight:'bold'}}>{comment.NAME}</p>
                                    <p>{comment.POSTDATE}</p>
                                </div>
                                <div className='comment'>
                                    <p>{comment.COMMENTS}</p>
                                </div>
                                </div>
                    })
                }
                <div className='addComment-container'>
                    <input type="text" name="addComment" id="" className='addComment-field' onChange={handleChange} placeholder='Add a comment'/>
                    <input type="button" value="submit" placeholder='submit' onClick={handleSubmit}  />
                </div>

            </div>
        </div>
    );
};

export default Comments;