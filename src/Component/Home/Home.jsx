import React, { useState } from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import TopComp from './TopComp/TopComp';
import './Home.css'
import MidSection from './MidSection/MidSection';
import { useContext } from 'react';
import { UserContext } from '../../App';


const Home = () => {

    const [loggedInUser,setLoggedInUser] = useContext(UserContext)

    const [state,setState] = useState(loggedInUser?.USERNAME? 2:0);
    return (
        <div className='home-container'>
            <TopComp state ={state} setState = {setState}></TopComp>
            <MidSection state ={state} setState = {setState}></MidSection>
        </div>
    );
};

export default Home;