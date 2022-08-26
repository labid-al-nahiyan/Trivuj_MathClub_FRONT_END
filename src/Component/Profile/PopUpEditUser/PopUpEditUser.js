import React, { useState } from 'react';
import axios from 'axios';
import './PopUpEditUser.css'

const PopUpEditUser = ({userInfo,isOpen,setIsOpen}) => {

    
    const [UserInfo,setUserInfo] = useState({
        ID : userInfo.ID,
        userName : userInfo.USERNAME,
        Name : userInfo.NAME,
        Email : userInfo.EMAIL,
        Phone : userInfo.PHONE,
        Institution :userInfo.INSTITUTION,
        Class : userInfo.CLASS,
        City : userInfo.CITY,
        Photo : ''
    })


    

    const handleChange=(event)=>{
        setUserInfo({...UserInfo,[event.target.name]:event.target.value})
        console.log(UserInfo)
    }
    const handleImage=(event)=>{
        const imgData = new FormData();
        imgData.set('key', 'db302a015e2744baa113f6efacad2c64')
        imgData.append('image', event.target.files[0])
        axios.post('https://api.imgbb.com/1/upload', imgData)
            .then(data => {
                console.log(data.data.data.display_url);
                const imgLink = data.data.data.display_url
                let newImg = {};
                setUserInfo({...UserInfo, Photo: imgLink})
                console.log(newImg)
               // setBooks(newBook)
            })
            .catch(err => console.log(err))
    }
    const handleSubmit=()=>{
        console.log(UserInfo)
        setIsOpen(0)
    }
    return (
        <div className='container'>
            <div className="form text-center" >
                        <form action="">
                            <div className='flex-display'>
                                <p>Username : </p>
                                <input className="popup-input-field" onChange={handleChange} name="userName" type="text" defaultValue={userInfo.USERNAME} required/>
                                
                            </div>
                            <div className='flex-display'>
                                <p>NAME :  </p>
                                <input className="popup-input-field" onChange={handleChange} name="Name" type="text" defaultValue={userInfo.NAME} required/>
                            </div>
                               
                            <div className='flex-display'>
                                <p>EMAIL :  </p>
                                <input className="popup-input-field" onChange={handleChange} name="Email" type="email" defaultValue={userInfo.EMAIL} required/>
                            </div>
                            <div className='flex-display'>
                                <p>Phone Number :  </p>
                                <input className="popup-input-field" onChange={handleChange} name="Phone" type="number" defaultValue={userInfo.PHONE} required/>
                            </div>
                            <div className='flex-display'>
                                <p>Date of Birth :  </p>
                                <input type="date" name="DOB" onChange={handleChange} className='popup-input-field' defaultValue={userInfo.DOB} />
                            </div>
                            <div className='flex-display'>
                                <p>Institution :  </p>
                                <input type="text" name="Institution" onChange={handleChange} className='popup-input-field' defaultValue={userInfo.INSTITUTION} />
                            </div>
                            <div className='flex-display'>
                                <p>Class :  </p>
                                <input className="popup-input-field" onChange={handleChange} name="Class" type="text" defaultValue={userInfo.CLASS} required/>
                            </div>
                            <div className='flex-display'>
                                <p>City :  </p>
                                <input className="popup-input-field" onChange={handleChange}  name="City" type="text" defaultValue={userInfo.CITY} required/>
                            </div>
                            <div className='flex-display'>
                                <p>Choose Profile Image : </p>
                                <input type="file" name="img" id="" onChange={handleImage} />
                            </div>
       
                        </form>
                        <input type="button" value="Submit" onClick={handleSubmit}/>

                    </div> 
        </div>
    );
};

export default PopUpEditUser;