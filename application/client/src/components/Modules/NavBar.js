import React, { useState } from 'react';
import Hamburger from 'hamburger-react';
import NavigationIcons from './NavigationIcons';
import Search from './Search';
import { GrClose } from 'react-icons/gr';

const NavBar = (props) => {

    //hamburger menu open and close
    const [open, setOpen] = useState(false);

    return (
        <div className="navbar">  
            <div className="navbar-app-logo">
            <img  
              src={'/uploads/dropsell-logo.jpeg'}
              className="app-logo"
              alt="Dropsell logo"
            />
            </div>
            {/*<Search searchQuery={props.searchQuery} setSearchQuery={props.setSearchQuery}/>*/} 
            <Hamburger className="hamburger-react" toggled={open} toggle={setOpen}/>
            <NavigationIcons page={props.page} open={open} setOpen={setOpen} />
        </div>
    );
};

export default NavBar;
