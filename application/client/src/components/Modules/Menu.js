import React, {useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import { connect, useDispatch } from 'react-redux';
import {
  setCartContents
} from '../../redux/actions/shoppingCartActions';

const Menu = (props) => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        axios.get(`/api/cart/${props.user_id}`)
            .then((res) => {
                //dispatch(getProducts(res.data));
                console.log('from menu');
                console.log(res);
                dispatch(setCartContents(res.data));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div id="sidenav-menu" onClick={() => props.handleMouseClick()}>
            <NavLink className="checkout-button-nav" to="/receipt-info">
                <div className="checkout-button"> 
                    <span className="checkout-button-span2"> Checkout </span> 
                    <span className="checkout-button-span1"> $ {props.cart.subtotal} </span> 
                </div>
            </NavLink>
            <div className="shopping-cart-products">
                <ul className="shopping-cart-products-ul">
                    {   
                        (props.cart.products === undefined) ? null 
                        : props.cart.products.map((product, index) => (
                            <li key={index}>
                                <div className="checkout-product-quantity-title">
                                    <h4> {product.title} </h4>
                                </div>
                                <div className="checkout-product-price">
                                    <h4> {product.price} </h4>
                                </div>
                            </li>
                        )) 
                    }
                </ul>
            </div>
        </div>
    );
};

function mapStateToProps(state) {
    return { 
        cart: state.shoppingCartReducer.cart,
        user_id: state.loginReducer.user_id,
    };
}

export default connect(mapStateToProps)(Menu);