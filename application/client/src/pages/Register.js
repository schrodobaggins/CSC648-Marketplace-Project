import React from 'react';
import { Redirect, NavLink} from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    setFirstname,
    setLastname,
    setEmail,
    setUsername,
    setPassword,
    setConfirmPassword,
    setTOS,
    createUser,
    setDriversLicense
} from '../redux/actions/registerActions';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';


const Register = (props) => {

    // dispatch state data back to redux
    const dispatch = useDispatch();
   
    const registerFirstname = useSelector((state) => state.registerReducer.firstname);
    const registerLastname = useSelector((state) => state.registerReducer.lastname);
    const registerEmail = useSelector((state) => state.registerReducer.email);
    const registerUsername = useSelector((state) => state.registerReducer.username);
    const registerPassword = useSelector((state) => state.registerReducer.password);
    const registerConfirmPassword = useSelector((state) => state.registerReducer.confirmPassword);
    const registerDriversLicense = useSelector((state) => state.registerReducer.driversLicense);
    const termsOfServices = useSelector((state) => state.registerReducer.termsOfServices);

    const submitHandler = () => {
        dispatch(createUser());
    };


    if(props.registered) {
        return (
            <Redirect to={{ pathname: "/login" }}/>
        );
    }
    else {
       
        return (
           
            <div className="register-wrapper">
                <NavBar page={"Register"} />
                
   
                <div className="container-signup">
                    <h1 className="SignUp-Title">Register</h1>  
                    <label className="label-register">
                        <div className="register-buyer-seller">
                            <label>
                                <input type="radio" id="buyer-input"/>
                                <span id="checkmark-buyer" className="checkmark"></span>
                                <span className="radio-description"> Buyer </span>
                            </label>
                            <label>
                                <input type="radio" id="seller-input"/>
                                <span id="checkmark-seller" className="checkmark"></span>
                                <span className="radio-description"> Seller </span>
                            </label>
                            <label>
                                <input type="radio" id="both-input"/>
                                <span id="checkmark-both" className="checkmark"></span>
                                <span className="radio-description"> Both </span>
                            </label>
                        </div>
                        <div className="register-wrapper-first-last">
                            <div>
                                <p>First Name</p>
                                <input className="register-firstname" tyep="text" placeholder="First name" autoComplete="First Name" value={registerFirstname} onChange={(e) => dispatch(setFirstname(e.target.value))} required/>
                            </div>
                            <div>
                                <p>Last Name</p>
                                <input className="register-lastname" tyep="text" placeholder="Last name" autoComplete="Last Name" value={registerLastname} onChange={(e) => dispatch(setLastname(e.target.value))} required/>
                            </div>
                        </div>
                        <div className="register-wrapper-email">
                            <p>Email</p>
                            <input className="register-email" tyep="text" placeholder="Email Address" autoComplete="Email" value={registerEmail} onChange={(e) => dispatch(setEmail(e.target.value))} required/>
                        </div>
                        <div className="register-wrapper-username">
                            <p>Username</p>
                            <input className="register-username" type="text" placeholder="Username" autoComplete="username" value={registerUsername} onChange={(e) => dispatch(setUsername(e.target.value))} required/>
                        </div>
                        <div className="register-wrapper-password">
                            <p>Password</p>
                            <input className="register-password" type="password" autoComplete="new-password" placeholder="Password" value={registerPassword} onChange={(e) => dispatch(setPassword(e.target.value))} required/>
                        </div>
                        <div className="register-wrapper-confPassword">
                            <p>Confirm Password</p>
                            <input className="register-confPassword" type="password" autoComplete="new-password" placeholder="Confirm Password" value={registerConfirmPassword} onChange={(e) => dispatch(setConfirmPassword(e.target.value))} required/>
                        </div>
                        <div className="dl-wrapper">
                            <p>Only enter if signing up as a Seller</p>
                            <input className="register-dl" type="text" autoComplete="DL#" placeholder="Driver's License ID" value={registerDriversLicense} onChange={(e) => dispatch(setDriversLicense(e.target.value))}/>
                        </div>
                    </label>

                    <div className="tos-checkbox">
                        <span className="tos-checkbox-text"> By checking the box, you agree to Dropsell's <NavLink to="/TOS"> Terms of Services and Privacy Agreement. </NavLink> </span> <input type="checkbox" id="Terms of Services" value={termsOfServices} onChange={(e) => dispatch(setTOS(e.target.value))} required />
                    </div>
                   
                    <button className="submit-signup" onClick={submitHandler}> Register </button>
                </div>

                <Footer/>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return { registered: state.registerReducer.registered };
}

export default connect(mapStateToProps)(Register);