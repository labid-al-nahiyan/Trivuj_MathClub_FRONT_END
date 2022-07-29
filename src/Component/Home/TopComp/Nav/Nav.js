import React from 'react';
import { Link } from 'react-router-dom';
import './Nav.css'

const Nav = () => {
    return (
        <div>
            <div className='state3-top'>
                <div className='navContain'>
                    <div className='navDiv nav1'> 
                        <Link to = '/problemset'><button className='topNavBtn'>Problemset</button></Link>
                    </div>
                    <div className='navDiv nav1'>
                        <Link to = '/contest'><button className='topNavBtn'>Contest</button></Link>
                    </div>
                    <div className='navDiv nav1'> 
                        <Link to = '/campaign'><button className='topNavBtn'>Campaign</button></Link>
                    </div>
                </div>

                <div className="navContain">
                    <div className='navDiv nav2'>
                        <Link to = '/blog'><button className='topNavBtn'>Blog</button></Link>
                    </div>
                    <div className='navDiv nav2'>
                        <Link to = '/library'><button className='topNavBtn'>Library</button></Link>
                    </div>
                </div>
                
            </div>
        </div>
    );
};

export default Nav;