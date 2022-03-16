import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Baker = () => {
    return (
        <div className="team-member">
            <NavBar page={"Baker"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Mitchel Baker </h2>
            <img
                src={`/uploads/mbaker.jpg`}
                className="team-member-image"
                alt="Failed to load."
            />
            <p> Hey! My name's Mitchel. When not programming, I enjoy surfing, climbing, and hiking to experience the outdoors. </p>
            <Footer/>
        </div>
    );
};

export default Baker;