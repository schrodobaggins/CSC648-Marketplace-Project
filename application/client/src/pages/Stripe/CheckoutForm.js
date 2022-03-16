import React, { useEffect } from 'react';
import axios from 'axios';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
import CardSection from './CardSection';
import { connect, useDispatch } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';
import {
    setClientSecret,
    setUserCheckout,
} from '../../redux/actions/shoppingCartActions';

const CheckoutForm = (props) => {

    const dispatch = useDispatch(); 

    useEffect(() => {
        axios.get('/api/secret')
            .then((res) => {
                console.log(res);
                dispatch(setClientSecret(res.data.client_secret));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {

        // Prevent default form submission
        event.preventDefault();

        if(!stripe || !elements) {
            // Stripe.js not yet loaded
            return;
        }

        const result = await stripe.confirmCardPayment(`${props.secret}`, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: 'Test',
                },
            }
        });

        if(result.error) {
            // Show error to customer
            console.log(result.error.message);
        }
        else {
            // payment has processed
            if(result.paymentIntent.status === 'succeeded') {
                // Show a success message to your customer
                // There's a risk of the customer closing the window before callback
                // execution. Set up a webhook or plugin to listen for the
                // payment_intent.succeeded event that handles any business critical
                // post-payment actions.
                dispatch(setUserCheckout(true));
            }
        }
    };

    if(props.checkout) {
        return (
            <Redirect to={{ pathname: "/final-invoice" }}/>
        );
    }
    else {
        return (
            <form className="stripe-form" onSubmit={handleSubmit}>
                <CardSection />
                <div className="cancel-continue-buttons">
                    <NavLink className="nav-link" to="/summary"> <span className="modify-order"> Back </span> </NavLink>
                    <button className="continue-order" disabled={!stripe}> Checkout </button>
                </div>
                
            </form>
        );
    }
};

function mapStateToProps(state) {
    return { 
        secret: state.shoppingCartReducer.secret,
        checkout: state.shoppingCartReducer.checkout,
    };
}

export default connect(mapStateToProps)(CheckoutForm);