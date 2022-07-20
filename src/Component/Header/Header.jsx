import React, { useState } from 'react';
import './Header.css';
import HeaderLogo from './HeaderLogo/HeaderLogo';
import HeaderNav from './HeaderNav/HeaderNav';
import NavBtn from './NavBtn/NavBtn';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    return (
        <div className="container-fluid">
            <div className="header">
                <div className='logo'>
                    <HeaderLogo></HeaderLogo>
                </div>
                <div>
                    <div className="navSide">
                        <div className="item-1"><HeaderNav setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen}/></div>
                        <div className="item-2"><NavBtn isOpen={isMenuOpen}/></div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Header;