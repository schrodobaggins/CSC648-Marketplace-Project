import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';
import StripeWrapper from './Stripe/StripeWrapper';

const Checkout = (props) => {

    return (
        <div className="checkout-experience">
            <NavBar page={"Checkout"}/>
            <div className="checkout-wrapper">
                <div className="checkout-content">
                    <div className="user-checkout">
                        <div className="checkout-details">
                            <h4> Payment Details </h4>
                        </div>
                        <StripeWrapper />
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Checkout;