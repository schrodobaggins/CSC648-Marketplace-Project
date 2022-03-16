import axios from 'axios';

export const updateFirstName = (firstName) => ({
    type: 'USER_UPDATE_FIRSTNAME',
    firstName
});

export const updateLastName = (lastName) => ({
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

export const updateLocation_Action = (location) => ({
    type: 'USER_UPDATE_LOCATION', 
    location
}); 

export const updateSocialMedia_Action = (socialMedia) => ({
    type: 'USER_UPDATE_SOCIALMEDIA', 
    socialMedia
}); 

export const updateAccount = () => {
    return (dispatch, getState) => {

        const sellerData = {
            firstName: getState().sellerSettingsReducer.firstName,
            lastName: getState().sellerSettingsReducer.lastName,
            birthday: getState().sellerSettingsReducer.birthday, 
            email: getState().sellerSettingsReducer.email, 
            phone: getState().sellerSettingsReducer.phone, 
            username: getState().sellerSettingsReducer.username, 
            password: getState().sellerSettingsReducer.password, 
            cardNumber: getState().sellerSettingsReducer.cardNumber, 
            cardExpirationDate: getState().sellerSettingsReducer.cardCVV, 
            cardPostalCode: getState().sellerSettingsReducer.cardPostalCode
        };

        console.log(sellerData);

        axios.put(`/api/users/${getState().loginReducer.user_id}`, sellerData)
            .then((res) => {
                console.log(res);
                if(res.status === 201) {
                 //   dispatch(redirectUser(true));
                    console.log(res.data);
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
}

export const updateProfile = () => {
    return (dispatch, getState) => {
        const sellerData2 = {
            bioDescription: getState().sellerSettingsReducer.bioDescription, 
            location: getState().sellerSettingsReducer.location, 
            socialMedia: getState().sellerSettingsReducer.socialMedia
        }; 
        console.log(sellerData2); 

        axios.put(`/api/profile/${getState().loginReducer.user_id}`, sellerData2)
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