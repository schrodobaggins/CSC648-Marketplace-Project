import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Schroeder = () => {
    return (
        <div className="team-member">
            <NavBar page={"Schroeder"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Michael Schroeder </h2>
            <img
                src={`/uploads/michael.png`}
                className="team-member-image"
                alt="Failed to load."
            />
            <p> Hi there! Outside of programming, I love to spend most of my time diving headfirst into my hobbies and pop culture addictions.
             I enjoy restoring and repairing old retro equipment, such as old video game consoles or older CRT's (tube TVs).
           I have a major passion for all things Star Wars as well, and I am currently building a screen accurate Stormtrooper armor set.  </p>
            <Footer/>
        </div>
    );
};

export default Schroeder;