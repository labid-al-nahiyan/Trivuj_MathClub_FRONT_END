import React from 'react';
import { Link } from 'react-router-dom';
import './NavBtn.css';

const NavBtn = ({isOpen}) => {
    return (
        <div className={isOpen?"open":"close"}>
            <ul className="menu-list">
                <Link to='/'><li className="link">Home</li></Link>
                <Link to='/problemset'><li className="link">ProblemSet</li></Link>
                <Link to='/contest'><li className="link">Contest</li></Link>
                <Link to='/login'><li className="link">Login</li></Link>
            </ul>
        </div>
    );
};

export default NavBtn;