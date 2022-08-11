import React from 'react';
import NavBar from '../NavBar/NavBar';
import './LeaderBoard.css'

const LeaderBoard = () => {
    return (
        <div>
            <NavBar></NavBar>
            <div className='leaderBoard-container'>
                <h1>Leader Board</h1>
            </div>
        </div>
    );
};

export default LeaderBoard;