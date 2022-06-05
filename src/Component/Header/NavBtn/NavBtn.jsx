import React from 'react';
import './NavBtn.css';

const NavBtn = ({isOpen}) => {
    return (
        <div className={isOpen?"open":"close"}>
            <ul className="menu-list">
                <li>Home</li>
                <li>ProblemSet</li>
                <li>Contest</li>
                <li>Login</li>
            </ul>
        </div>
    );
};

export default NavBtn;