import axios from 'axios';

export const updateFirstName_Action = (firstName) => ({
    type: 'USER_UPDATE_FIRSTNAME',
    firstName
});

export const updateLastName_Action = (lastName) => ({
    type: 'USER_UPDATE_LASTNAME',
    lastName
});


export const updateBirthday_Action = (birthday) => ({
    type: 'USER_UPDATE_BIRTHDAY', 
    birthday
}); 

export const updateEmail_Action = (email) => ({
    type: 'USER_UPDATE_EMAIL', 
    email
}); 

export const updatePhone_Action = (phone) => ({
    type: 'USER_UPDATE_PHONE', 
    phone
}); 

export const updateUserName_Action = (username) => ({
    type: 'USER_UPDATE_USERNAME', 
    username
}); 


export const updatePassword_Action = (password) => ({
    type: 'USER_UPDATE_PASSWORD', 
    password
}); 

export const updateCardNumber_Action = (cardNumber) => ({
    type: 'USER_UPDATE_CARDNUMBER',
    cardNumber
});

export const updateExpirationDate_Action = (cardExpirationDate) => ({
    type: 'USER_UPDATE_CARDEXPIRATIONDATE', 
    cardExpirationDate 
}); 

export const updateCVV_Action = (cardCVV) => ({
    type: 'USER_UPDATE_CARDCVV', 
    cardCVV
}); 

export const updatePostalCode_Action = (cardPostalCode) => ({
    type: 'USER_UPDATE_CARDPOSTALCODE', 
    cardPostalCode
}); 


export const updateBioDescription_Action = (bioDescription) => ({
    type: 'USER_UPDATE_BIODESCRIPTION', 
    bioDescription
}); 

export const updateRateStars_Action = (rateStars) => ({
    type: 'USER_UPDATE_RATESTARS', 
    rateStars
}); 

export const updateSocialMedia_Action = (socialMedia) => ({
    type: 'USER_UPDATE_SOCIALMEDIA', 
    socialMedia
}); 

export const updateReview_Action = (review) => ({
    type: 'USER_UPDATE_REVIEW', 
    review
});

export const updateMailingAddress_Action = (mailingAddress) => ({
    type: 'USER_UPDATE_MAILINGADDRESS', 
    mailingAddress
});

export const updateZipCode_Action = (zipCode) => ({
    type: 'USER_UPDATE_ZIPCODE', 
    zipCode
});


export const updateAccount = () => {
    return (dispatch, getState) => {

        const buyerData = {
            firstName: getState().buyerSettingsReducer.firstName,
            lastName: getState().buyerSettingsReducer.lastName,
            birthday: getState().buyerSettingsReducer.birthday, 
            email: getState().buyerSettingsReducer.email, 
            phone: getState().buyerSettingsReducer.phone, 
            username: getState().buyerSettingsReducer.username, 
            password: getState().buyerSettingsReducer.password, 
            cardNumber: getState().buyerSettingsReducer.cardNumber, 
            cardExpirationDate: getState().buyerSettingsReducer.cardCVV, 
            cardPostalCode: getState().buyerSettingsReducer.cardPostalCode
        };

        console.log(buyerData);

        
        axios.put(`/api/users/${getState().loginReducer.user_id}`, buyerData)
            .then((res) => {
                console.log(res);
                if(res.status === 201) {
                 //   dispatch(redirectUser(true));
                }

            })
            .catch((err) => {
                console.log(err);
            });
    
    };
}

export const updateProfile = () => {
    return (dispatch, getState) => {
        const buyerData2 = {
            bioDescription: getState().buyerSettingsReducer.bioDescription, 
            location: getState().buyerSettingsReducer.location, 
            socialMedia: getState().buyerSettingsReducer.socialMedia,
            review: getState().buyerSettingsReducer.review,
        }; 
        console.log(buyerData2); 

        
        axios.put(`/api/users/${getState().loginReducer.user_id}`, buyerData2)
        .then((res) => {
            console.log(res);
            if(res.status === 201) {
               // dispatch(redirectUser(true));
            }

        })
        .catch((err) => {
            console.log(err);
        });
        

    };



}

export const updateShipping = () => {
    return (dispatch, getState) => {
        const buyerData3 = {
            mailingAddress: getState().buyerSettingsReducer.mailingAddress, 
            zipCode: getState().buyerSettingsReducer.zipCode,
        }; 
        console.log(buyerData3); 

        
        axios.put(`/api/users/${getState().loginReducer.user_id}`, buyerData3)
        .then((res) => {
            console.log(res);
            if(res.status === 201) {
              //  dispatch(redirectUser(true));
            }

        })
        .catch((err) => {
            console.log(err);
        });
        
    };
}


