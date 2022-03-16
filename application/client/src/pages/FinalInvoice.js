import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';
import { connect, useDispatch } from 'react-redux';
import {
    setUserCheckout,
} from '../redux/actions/shoppingCartActions';

const FinalInvoice = (props) => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        dispatch(setUserCheckout(false));
    }, []);

    return (
        <div className="receiptinfo-experience">
            <NavBar page={"finalInvoice"}/>
            <div className="final-invoice-wrapper">
                <div className="final-invoice-content">
                    <div className="user-final-invoice">
                        <div className="final-invoice-details">
                            <div className="confirmation-details">
                                <h4> Your purchase has been confirmed! </h4>
                                <h5> Date </h5>
                                <h5> Confirmation number: <span> 678e068c-74b1-4ae0-b4bb-dfb959eeb42f </span> </h5>
                                <h5> A confirmation has been sent to your email at: <span> email@mail.com </span> </h5>
                            </div>
                            <div className="final-invoice-product-list">
                                <div className="product-details">
                                    <span className="product-detail-span"> Product </span>
                                    <span className="product-detail-span"> Name </span>
                                    <span className="product-detail-span"> Price </span>
                                </div>
                            </div>
                        </div>
                        <ul className="shopping-cart-products-final-invoice">
                            {
                                (props.cart.products === undefined) ? null
                                : props.cart.products.map((product, index) => (
                                    <li key={index}>
                                        <div>
                                            <img  
                                              src={`/uploads/${product.image}`}
                                              className="product-image-summary"
                                              alt="Failed to load."
                                            />
                                        </div>
                                        <div className="product-title-price-summary">
                                            <h3> {product.title} </h3>
                                            <h3> {product.price} </h3>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                        <div className="cancel-continue-buttons">
                            <NavLink className="nav-link" to="/"> <span className="continue-order"> Continue Shopping </span> </NavLink>
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
};

function mapStateToProps(state) {
    return { 
        cart: state.shoppingCartReducer.cart
    };
}

export default connect(mapStateToProps)(FinalInvoice);