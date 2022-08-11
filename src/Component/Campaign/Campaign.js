import React from 'react';
import NavBar from '../NavBar/NavBar';
import { Link } from 'react-router-dom';
import './Campaign.css'
import { useContext } from 'react';
import { UserContext } from '../../App';

const Campaign = () => {
    const [loggedInUser,setLoggedInUser] = useContext(UserContext);
    return (
        <div>
            <NavBar></NavBar>
            <h3>Campaign</h3>
            <hr />
            <div className='campaign-container'>
                <div className='campaign-left'>
                    
                    <input type="submit" value="All Campaign" className='CampaignBtn'/>
                    <input type="submit" value="My Campaign" className='CampaignBtn'/>
                    {loggedInUser?.MEMBER_TYPE !== "student" &&<Link to='/addCampaign'><input type="submit" value="Add Campaign" className='CampaignBtn'/></Link>}
                    
                </div>
                <div className='campaign-right'>
                    <h1>Here campaign show</h1>
                </div>
            </div>
        </div>
    );
};

export default Campaign;