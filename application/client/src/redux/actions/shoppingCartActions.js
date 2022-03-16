export const setCartContents = (cart) => ({
    type: 'SET_CART_CONTENTS',
    cart
});

export const setClientSecret = (secret) => ({
    type: 'SET_CLIENT_SECRET',
    secret
});

export const setUserCheckout = (checkout) => ({
    type: 'SET_USER_CHECKOUT',
    checkout
});