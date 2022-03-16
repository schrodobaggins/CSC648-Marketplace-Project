const INITIAL_SELLER_SETTINGS_STATE = {
   displayProducts: 'test',
   firstName: '',
   lastName: '',
   birthday: '', 
   email: '', 
   phone: '', 
   username: '', 
   password: '', 
   cardNumber: '', 
   cardExpirationDate: '', 
   cardCVV: '', 
   cardPostalCode: '', 
   bioDescription: '', 
   location: '', 
   socialMedia: '', 
};

const sellerSettingsReducer = (state = INITIAL_SELLER_SETTINGS_STATE, action) => {

    switch(action.type) {
        case 'USER_UPDATE_FIRSTNAME':
            return {
                ...state,
                firstName: action.firstName,
            };

        case 'USER_UPDATE_LASTNAME':
            return {
                ...state,
                lastName: action.lastName
            };
        
        case 'USER_UPDATE_BIRTHDAY':
            return {
                ...state,
                birthday: action.birthday
            };
        
        case 'USER_UPDATE_EMAIL':
            return {
                ...state,
                email: action.email
            };
        

        case 'USER_UPDATE_PHONE':
            return {
                ...state,
                phone: action.phone
            };
        
        case 'USER_UPDATE_USERNAME':
            return {
                ...state,
                username: action.username
            };
        
        
        case 'USER_UPDATE_PASSWORD':
            return {
                ...state,
                password: action.password
            };
        
        
        case 'USER_UPDATE_CARDNUMBER':
            return {
                ...state,
                cardNumber: action.cardNumber
            };
        
        
        case 'USER_UPDATE_CARDEXPIRATIONDATE':
            return {
                ...state,
                cardExpirationDate: action.cardExpirationDate
            };
        
        
        case 'USER_UPDATE_CARDCVV':
            return {
                ...state,
                cardCVV: action.cardCVV
            };
        
        case 'USER_UPDATE_CARDPOSTALCODE':
            return {
                ...state,
                cardPostalCode: action.cardPostalCode
            };
        
        case 'USER_UPDATE_BIODESCRIPTION':
            return {
                ...state,
                bioDescription: action.bioDescription
            };
        
        case 'USER_UPDATE_LOCATION':
            return {
                ...state,
                location: action.location
            };
        
        case 'USER_UPDATE_SOCIALMEDIA':
            return {
                ...state,
                socialMedia: action.socialMedia
            };
            
        
        
        default:
            return state;
    }
};

export default sellerSettingsReducer;