import React, { useState } from 'react';
import { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { UserContext } from '../../../App';
import LogIn from '../../LogIn/LogIn';
import MidSection from '../MidSection/MidSection';
import Nav from './Nav/Nav';
import './TopComp.css'

const TopComp = ({state,setState}) => {
        
    return (
        <div>
            <div className='top'>
                <div>
                    
                </div>
                <div className='topRight'>

                    {state=== 1 && <LogIn state={state} setState={setState}></LogIn>}
                    {state=== 0 && 
                        <div className='btnState'> 
                            <div className='ss'> 
                                <button className='enterBtn' onClick={()=>setState(1)}>Log In</button>
                            </div>
                            <div className='ss'>
                                <Link to = '/login'><button className='enterBtn'>Register</button></Link>
                            </div>
                        </div>
                    }
                    {state === 2 && 
                        <Nav></Nav>
                        
                    }
                </div>
                
            </div>
            
                  
        </div>
    );

};

export default TopComp;