import React from 'react';
import { NavLink } from 'react-router-dom';

const Feed = () => {
    return (
        <div className="userFeed-wrapper">
            <header className="App-header">
                <NavLink className="nav-link" to="/"> Home </NavLink>
                <NavLink className="nav-link" to="/about"> About </NavLink>
                <h1>User Feed</h1>
            </header>
        </div>
    );
};

export default Feed;