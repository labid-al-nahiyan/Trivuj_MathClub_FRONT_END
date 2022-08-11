import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';

const Admin = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    const [state,setState] = useState(loggedInUser?.USERNAME? 2:0);
    return (
        <div className='home-container'>
            
        </div>
    );
};

export default Admin;