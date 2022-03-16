const INITIAL_REGISTER_STATE = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    confirmPassword: '',
    TOS: '',
    driversLicense: '',
    registered: false,
    termsOfServices: false,
};

const registerReducer = (state = INITIAL_REGISTER_STATE, action) => {

    switch(action.type) {
        case 'USER_SET_FIRSTNAME':
            return {
                ...state,
                firstname: action.firstname,
            };

        case 'USER_SET_LASTNAME':
            return {
                ...state,
                lastname: action.lastname,
            };

        case 'USER_SET_EMAIL':
            return {
                ...state,
                email: action.email,
            };

        case 'USER_SET_USERNAME':
            return {
                ...state,
                username: action.username,
            };
        
        case 'USER_SET_PASSWORD':
            return {
                ...state,
                password: action.password,
            };
        
        case 'USER_SET_CONFIRM_PASSWORD':
            return {
                ...state,
                confirmPassword: action.confirmPassword,
            };
        
        case 'USER_IS_REGISTERED':
            return {
                ...state,
                registered: action.registered,
            };

        case 'USER_SET_TOS':
            return {
                ...state,
                termsOfServices: action.TOS,
            };

        case 'USER_SET_DRIVERS_LICENSE':
            return {
                ...state,
                driversLicense: action.driversLicense
            };
        
        default:
            return state;
    }
};

export default registerReducer;