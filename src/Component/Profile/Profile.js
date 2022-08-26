import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import PopUpEditUser from './PopUpEditUser/PopUpEditUser';
import './Profile.css'

const Profile = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    const [isOpen,setIsOpen] = useState(0);
    const [img,setImg] = useState('');


    const handleImageUpload = (event) => {
        const imgData = new FormData();
        imgData.set('key', 'db302a015e2744baa113f6efacad2c64')
        imgData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imgData)
           .then(data => {
               console.log(data.data.data.display_url);
               const imgLink = data.data.data.display_url
               let newBook = {};
            //  newBook = { ...books, img: imgLink }
            //  console.log(newBook)
            //  setBooks(newBook)
            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            {isOpen?<PopUpEditUser userInfo={loggedInUser} isOpen={isOpen} setIsOpen={setIsOpen}></PopUpEditUser> :''}

            <NavBar></NavBar>

            <div className={!isOpen?'profile-containerNav':'popUp-profile-container'}>
                
                <div className="profile-container">
                    
                    <div className="profile-left">
                    </div>
                    <div className="profile-right">
                        <div className="profile-right-header">
                            <h1>Profile</h1>
                        </div>
                        <div className="profile-info">
                            
                            <div className='inside-profile-info'>
                                <h2>{loggedInUser.USERNAME}</h2>
                                <h4>{loggedInUser.NAME}</h4>
                                <h5>{loggedInUser.EMAIL}</h5>

                                <h5>{loggedInUser.INSTITUTION}</h5>
                                <input type="button" value="Edit Information" onClick={()=>{setIsOpen(1)}}  />
                            </div>
                            <div className='profile-photo'>
                                <div className='profile-photo'>
                                    
                                    <img src={loggedInUser.PHOTO} alt="hello" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Profile;