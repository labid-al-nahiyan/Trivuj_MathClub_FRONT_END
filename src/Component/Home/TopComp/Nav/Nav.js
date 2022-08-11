import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    const logout = ()=>{
        window.localStorage.clear();
        Navigate('/', {replace:true});
        window.location.reload();
    }
    return (
        <div>
            <div className='state3-top'>
                <div className='navContain'>
                    <div className='navDiv nav1'> 
                        <Link to = '/problemset'><button className='topNavBtn'>Problemset</button></Link>
                    </div>
                    <div className='navDiv nav1'> 
                        <Link to = '/campaign'><button className='topNavBtn'>Campaign</button></Link>
                    </div>
                    <div className='navDiv nav1'>
                        <Link to = '/leaderboard'><button className='topNavBtn'>LeaderBoard</button></Link>
                    </div>
                    
                </div>

                <div className="navContain">
                    <div className='navDiv nav2'>
                        <Link to = '/post'><button className='topNavBtn'>Post</button></Link>
                    </div>
                    <div className='navDiv nav2'>
                        <Link to = '/' onClick={logout}><button className='topNavBtn'>Log Out</button></Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Nav;