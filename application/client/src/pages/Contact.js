import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';

const Contact = () => {
    return (
        <div className="contact-wrapper">
            <NavBar page={"Contact"}/>
                <span> Coming soon! Not yet implemented. </span>
            <Footer/>
        </div>
    );
};

export default Contact;