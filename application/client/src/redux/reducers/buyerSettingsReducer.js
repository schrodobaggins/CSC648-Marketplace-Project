const INITIAL_BUYER_SETTINGS_STATE = {
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
    rateStars: '', 
    socialMedia: '', 
    review: '', 
    mailingAddress: '', 
    zipCode: '', 

 };
 
 const buyerSettingsReducer = (state = INITIAL_BUYER_SETTINGS_STATE, action) => {

    console.log(action); 
 
     switch(action.type) {

        case 'USER_UPDATE_FIRSTNAME':
            return {
                ...state,
                firstName: action.firstName,
            };
        

        case 'USER_UPDATE_LASTNAME':
            return {
                ...state,
                lastName: action.lastName,
            };


        case 'USER_UPDATE_BIRTHDAY':
             return {
                 ...state,
                 birthday: action.birthday,
             };

        
        case 'USER_UPDATE_EMAIL':
            return {
                ...state,
                email: action.email,
            };

        case 'USER_UPDATE_PHONE':
            return {
                ...state,
                phone: action.phone,
            };
        
        
        case 'USER_UPDATE_USERNAME':
            return {
                ...state,
                username: action.username,
            };   


        case 'USER_UPDATE_PASSWORD':
            return {
                ...state,
                password: action.password,
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
        
        case 'USER_UPDATE_RATESTARS':
            return {
                ...state,
                rateStars: action.rateStars
            };
        
        case 'USER_UPDATE_SOCIALMEDIA':
            return {
                ...state,
                socialMedia: action.socialMedia
            };

        case 'USER_UPDATE_REVIEW':
            return {
                ...state,
                review: action.review
            };
        
        case 'USER_UPDATE_MAILINGADDRESS': 
            return {
                ...state, 
                mailingAddress: action.mailingAddress
            }; 
        
        case 'USER_UPDATE_ZIPCODE': 
            return {
                ...state, 
                zipCode: action.zipCode
            }; 
        
        default:
            return state;    

     }
 };
 
 export default buyerSettingsReducer;