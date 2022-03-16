import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Eusebio = () => {
    return (
        <div className="team-member">
            <NavBar page={"Eusebio"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Charmaine Eusebio </h2>
            <img
                className="team-member-image"
                src={`/uploads/charmaine.jpg`}
                alt="Failed to load."
            />
            <p> Description :) </p>
            <p> Hi there, I'm Charmaine from Guam! 
                <br></br>
               A former chef turned software engineer💖</p>
            <Footer/>
        </div>
    );
};

export default Eusebio; 