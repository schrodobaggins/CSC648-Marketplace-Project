import React from 'react';
import { Redirect, NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    setUsername,
    setPassword,
    loginUser
} from '../redux/actions/loginActions';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';

const Login = (props) => {

    // dispatch state data back to redux 
    const dispatch = useDispatch();
    const loginUsername = useSelector((state) => state.loginReducer.username);
    const loginPassword = useSelector((state) => state.loginReducer.password);

    const loginHandler = () => {
        dispatch(loginUser());
    };

    if(props.loggedIn) {
        return (
            <Redirect to={{ pathname: "/profile" }}/>
        );
    }
    else {
        return (
            <div className="login-wrapper">
                <NavBar page={"Login"}/>
                 
                
                <div className="container-login">
                    <h2 className="Login-Title"> Login </h2> 
                    <label className="label-login">
                        <p>UserName</p>
                        <input className="user-login" type="text" placeholder="Username" value={loginUsername} onChange={(e) => dispatch(setUsername(e.target.value))} required/>
                        <p>Password</p>
                        <input className="user-password" type="password"  placeholder="Password" value={loginPassword} onChange={(e) => dispatch(setPassword(e.target.value))} required/>
                    </label>
                    <button className="submit-login" onClick={loginHandler}>Log In</button> 
                </div> 
                <div className="signup-login-container">
                    <p>Don't Have an Account? Sign Up Now!  
                    <NavLink to="/register"> <button className="submit-signup" >  Sign Up </button> </NavLink> 
                   </p>
                </div>
                <Footer/>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return { loggedIn: state.loginReducer.loggedIn };
}

export default connect(mapStateToProps)(Login);