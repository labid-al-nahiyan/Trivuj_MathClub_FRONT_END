import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../../App';
import NavBar from '../NavBar/NavBar';
import './Profile.css'

const Profile = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext);

    return (
        <div>
            <NavBar></NavBar>

            <div className="profile-container">
                <div className="profile-left">
                </div>
                <div className="profile-right">
                    <div className="profile-right-header">
                        <h1>Profile</h1>
                    </div>
                    <div className="profile-info">
                        
                        <div className='inside-profile-info'>
                            <h1>{loggedInUser.FIRST_NAME} {loggedInUser.LAST_NAME}</h1>
                            <h3>{loggedInUser.MEMBER_TYPE}</h3>
                        </div>
                        <div>

                        </div>
                    </div>
                </div>
                <div>
                </div>
            </div>

        </div>
    );
};

export default Profile;