import React from 'react';
import {BiAlignRight} from "react-icons/bi";

const HeaderNav = ({setIsMenuOpen,isMenuOpen}) => {
    return (
        <div className="nav">
            <BiAlignRight className="nav-icon" onClick={()=>{
                if(isMenuOpen==true)setIsMenuOpen(false);
                else setIsMenuOpen(true);
                }
            }/>
        </div>
    );
};

export default HeaderNav;