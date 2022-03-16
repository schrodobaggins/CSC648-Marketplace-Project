import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import CheckoutForm from './CheckoutForm';

// Call 'loadStripe' outside of component render to
// avoid recreating 'Stripe' object on each render
const stripePromise = loadStripe('pk_test_51JEVc1CR6vsjOOgoFOSt1MWjwHssIEZ9bNOmmlL7YTqu0bkBSCbCoxDNZ7pn8DXaZxcqEBbjxnlwQ9zhJvbYKY7a00ORFL0uqT');

const StripeWrapper = () => {

    return (
        <Elements stripe={stripePromise}>
            <CheckoutForm />
        </Elements>
    );
};

export default StripeWrapper;