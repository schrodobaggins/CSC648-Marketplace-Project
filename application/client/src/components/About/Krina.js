import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Krina = () => {
    return (
        <div className="team-member">
            <NavBar page={"Krina"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Krina Patel </h2>
            <img
                src={`/uploads/krinap.jpg`}
                className="team-member-image"
                alt="Failed to load."
            />
            <p> Hey Everyone. My name is Krina Patel. My areas of interest are music, meditation and exploring new places.</p>
            <Footer/>
        </div>
    );
};

export default Krina;