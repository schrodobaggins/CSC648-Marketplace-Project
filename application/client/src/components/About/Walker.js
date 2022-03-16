import React from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';

const Walker = () => {
    return (
        <div className="team-member">
            <NavBar page={"Walker"}/>
            <section className="navigation">
                <div className="navigation-links">
                    <NavLink className="nav-link" to="/"> Home </NavLink>
                    <NavLink className="nav-link" to="/about"> About </NavLink>
                </div>
            </section>
            <h2> Jamie Walker </h2>
            <img
                src={`/uploads/jwalker.jpg`}
                className="team-member-image"
                alt="Failed to load."
            />
            <p> Description: Hi my name is Jamie Walker and I am a senior at San Francisco State 
            <br></br> and expect to graduate in fall. 
            <br></br> I plan to look for work work in the game development or cyber secruit areas. 
            <br></br> When I am not working on school work I love spending time with my family, 
            <br></br> playing video games, or painting models. 
             </p>
            <Footer/>
        </div>
    );
};

export default Walker;