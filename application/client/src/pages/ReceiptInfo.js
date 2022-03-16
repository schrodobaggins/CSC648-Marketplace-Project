import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';

const ReceiptInfo = (props) => {

    return (
        <div className="receiptinfo-experience">
            <NavBar page={"receiptInfo"}/>
            <div className="receipt-wrapper">
                <div className="receipt-content">
                    <div className="user-receipt-info">
                        <h4> Enter Information for Receipt Details </h4>
                        <div className="user-first-last-wrapper">
                            <input required placeholder="First name" type="text" id="user-firstName" value=""/>
                            <input required placeholder="Last name" type="text" id="user-lastName" value=""/>
                        </div>
                        <div className="user-phone-wrapper">
                            <input required placeholder="Phone Number" type="text" id="user-phone" value=""/>
                        </div>
                        <div className="user-email-wrapper">
                            <input required placeholder="Email" type="text" id="user-email" value=""/>
                        </div>
                        <div className="receive-product-options">
                            <label> 
                                <input checked="checked" type="radio" id="pickup-input" />
                                <span id="checkmark-pickup" class="checkmark"></span>
                                <span class="radio-description"> Pickup </span>
                            </label>
                            <label>
                                <input type="radio" id="delivery-input" />
                                <span id="checkmark-delivery" class="checkmark"></span>
                                <span class="radio-description"> Delivery </span>
                            </label>
                        </div>
                        <div className="user-delivery-details">
                            <h4> Delivery Details </h4>
                            <section className="user-dAddress-wrapper">
                                <input placeholder="Street Address" type="text" id="user-address" value="" />
                                <input placeholder="City" type="text" id="user-city" value="" />
                                <input placeholder="State" type="text" id="user-state" value="" />
                                <input placeholder="Zip" type="text" id="user-zip" value="" />
                                <input placeholder="Unit" type="text" id="user-unit" value="" />
                            </section>
                        </div>
                        <div className="cancel-continue-buttons">
                            <NavLink className="nav-link" to="/"> <span className="modify-order"> Modify Order </span> </NavLink>
                            <NavLink className="nav-link" to="/summary"> <span className="continue-order"> Continue </span> </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default ReceiptInfo;