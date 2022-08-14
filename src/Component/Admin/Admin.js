import React, { useContext, useState } from 'react';
import { UserContext } from '../../App';
import './Admin.css'
import AdminLogin from './AdminLogin/AdminLogin';

const Admin = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    return (
        <div className='home-container'>
            <AdminLogin></AdminLogin>
        </div>  
    );
};

export default Admin;