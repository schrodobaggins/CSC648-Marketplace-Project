import React, {useState} from 'react';
import { NavLink } from 'react-router-dom';
import NavBar from '../components/Modules/NavBar';
import Footer from '../components/Modules/Footer';
import { connect, useDispatch } from 'react-redux';

const Summary = (props) => {

    return (
        <div className="receiptinfo-experience">
            <NavBar page={"Summary"}/>
            <div className="summary-wrapper">
                <div className="summary-content">
                    <div className="user-summary">
                        <div className="product-details">
                            <span className="product-detail-span"> Product </span>
                            <span className="product-detail-span"> Title </span>
                            <span className="product-detail-span"> Price </span>
                        </div>
                        <ul className="shopping-cart-products-summary">
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
                            <NavLink className="nav-link" to="/receipt-info"> <span className="modify-order"> Back </span> </NavLink>
                            <NavLink className="nav-link" to="/checkout"> <span className="continue-order"> Continue </span> </NavLink>
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

export default connect(mapStateToProps)(Summary);