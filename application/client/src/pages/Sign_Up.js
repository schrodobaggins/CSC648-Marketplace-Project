import React from 'react';
import { NavLink } from 'react-router-dom';

const Sign_Up = () => {
    return (
        <div className="settings-wrapper">
            <NavLink className="nav-link" to="/"> Home </NavLink>
            <NavLink className="nav-link" to="/about"> About </NavLink>
            <NavLink className="nav-link" to="/profile"> Profile </NavLink>
            <h1 className="SignUp-Title">Sign Up</h1>  

            <div className="container-Sign_Up">
                <form>
                    <label className="label-signUp">
                        <p>First name</p>
                        <input type="text" name="firstName-SignUp" required/>
                        <p>Last name</p>
                        <input type="text" name="lastName-SignUp" required/>
                        <p>Email</p>
                        <input type="text" name="email-SignUp" required/>
                        <h1>Select: </h1>
                        <p>Buyer</p>
                        <input type="checkbox" name="Buyer-Select-SignUp"/>
                        <p>Seller</p>
                        <input type="checkbox" value="seller" name="Seller-Select-SignUp"/>
                        <input className="Submit-SignUp" type="submit" value="Submit" name="Submit-SignUp"/>
                    </label>
                </form>
            </div>
        </div>
    );
};

export default Sign_Up;