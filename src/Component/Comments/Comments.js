import React from 'react';
import './Comments.css'

const Comments = () => {
    return (
        <div>
            <div className='comment-container'>
                <div className='single-comment'>
                    <div className='commentor'>
                        <p style={{fontWeight:'bold'}}>Arko Sikder</p>
                    </div>
                    <div className='comment'>
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Veritatis iusto eaque aliquam asperiores, suscipit repudiandae saepe quo provident temporibus architecto tempora, nostrum odio sit consequuntur beatae ullam quae, ipsa quaerat.</p>
                    </div>
                </div>
                <div className='addComment-container'>
                    <input type="text" name="addComment" id="" className='addComment-field' placeholder='Add a comment'/>
                    <input type="button" value="submit" placeholder='submit' />
                </div>

            </div>
        </div>
    );
};

export default Comments;