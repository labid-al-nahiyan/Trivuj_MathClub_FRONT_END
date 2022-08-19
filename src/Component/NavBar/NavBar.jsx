import React from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../App';
import './NavBar.css'

const NavBar = () => {
    
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    let navigate  = useNavigate();
    let location = useLocation();
    const logout = ()=>{
        window.localStorage.clear();
        navigate('/', {replace:true});
        window.location.reload();
    }
    return (
        <div className='navBarContainer'>
            <div className="">
                    <ul className='menu'>
                        <Link to ='/' style={{ textDecoration: 'none'}}><li className='list'>Home</li></Link> 
                       <Link to ='/problemset' style={{ textDecoration: 'none'}}><li className='list'>Problem Set</li></Link> 
                       <Link to ='/campaign' style={{ textDecoration: 'none' }}><li className='list'>Campaign</li></Link> 
                       <Link to ='/post'style={{ textDecoration: 'none' }}><li className='list'>Post</li></Link> 
                       <Link to ='/leaderboard'style={{ textDecoration: 'none' }}><li className='list'>Leaderboard</li></Link> 


                    </ul>
            </div>
            <div >
                <ul className='menu menu-1'>
                   { loggedInUser?.NAME?<Link to={'/profile/'+loggedInUser.NAME} style={{ textDecoration: 'none'}}> <li className="list">{loggedInUser? loggedInUser.NAME:''}</li></Link>:''}
                    <li className="list" onClick={logout} style={{height:'37px'}}>Log Out</li>
                </ul>
            </div>
        </div>
    );
};

export default NavBar;