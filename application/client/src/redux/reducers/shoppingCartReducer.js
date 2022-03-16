const INITIAL_CART_STATE = {
    cart: [],
    secret: '',
    purchase: false,
};

const shoppingCartReducer = (state = INITIAL_CART_STATE, action) => {

    switch(action.type) {
        case 'SET_CART_CONTENTS':
            return {
                ...state,
                cart: action.cart,
            };
        
        case 'SET_CLIENT_SECRET':
            return {
                ...state,
                secret: action.secret,
            };

        case 'SET_USER_CHECKOUT':
            return {
                ...state,
                checkout: action.checkout,
            };

        default:
            return state;
    }
};

export default shoppingCartReducer;