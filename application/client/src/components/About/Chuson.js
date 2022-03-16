import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Chuson = () => {
    return (
        <div className="team-member">
            <NavBar page={"Chuson"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Kenneth Chuson </h2>
            <img
                src={`/uploads/chuson.jpg`}
                className="team-member-image"
                alt="Failed to load."
            />
            <p> Hi my name is Kenneth, I am interested in competitive programming and doing graphics design such as animation and abstract art.</p>
            <Footer/>
        </div>
    );
};

export default Chuson;