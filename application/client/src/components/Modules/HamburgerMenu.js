import React, {useState} from 'react';
import { GiHamburgerMenu } from 'react-icons/gi';
import { GrClose } from 'react-icons/gr';
import Hamburger from 'hamburger-react';
import NavBar from './NavBar'; 

    const HamburgerMenu = () => {
   
    //hamburger menu open and close
    const [open, setOpen] = useState(false);

    return(    
        <div className="hamburger-menu">
        <Hamburger toggled={open} toggle={setOpen}/>
        {open && <NavBar/>}
        </div>
        );
        
    }

    export default HamburgerMenu;