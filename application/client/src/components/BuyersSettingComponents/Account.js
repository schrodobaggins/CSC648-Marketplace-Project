import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateFirstName_Action,
    updateLastName_Action,
    updateAccount,
    updateBirthday_Action, 
    updateEmail_Action, 
    updatePhone_Action, 
    updateUserName_Action, 
    updatePassword_Action, 
    updateCardNumber_Action, 
    updateExpirationDate_Action, 
    updateCVV_Action, 
    updatePostalCode_Action, 
} from '../../redux/actions/buyersSettingsActions';


const Account = () => {

     // dispatch state data back to redux
     const dispatch = useDispatch();
     
     const updateFirstName = useSelector((state) => state.buyerSettingsReducer.firstName);
     const updateLastName = useSelector((state) => state.buyerSettingsReducer.lastName);
     const updateBirthday = useSelector((state) => state.buyerSettingsReducer.birthday); 
     const updateEmail = useSelector((state) => state.buyerSettingsReducer.email);
     const updatePhone = useSelector((state) => state.buyerSettingsReducer.phone);
     const updateUserName = useSelector((state) => state.buyerSettingsReducer.username);
     const updatePassword = useSelector((state) => state.buyerSettingsReducer.password);
     const updateCardNumber = useSelector((state) => state.buyerSettingsReducer.cardNumber);
     const updateExpirationDate = useSelector((state) => state.buyerSettingsReducer.cardExpirationDate);
     const updateCVV = useSelector((state) => state.buyerSettingsReducer.cardCVV);
     const updatePostalCode = useSelector((state) => state.buyerSettingsReducer.cardPostalCode);
 
     const updateAccountHandler = () => {
         dispatch(updateAccount());
     };

   return (
    <div className="buyerAccountSettings-wrapper">
        <div className="buyerAccountSettings-firstContainer">
            <h3>Information</h3>
            <div className="buyerAccountSettings-firstContainer_oneSide">
                <input placeholder="First Name" className="buyerInput-Settings"  value={updateFirstName} onChange={(e) => dispatch(updateFirstName_Action(e.target.value))} type="text"/>
                <input placeholder="Last Name" className="buyerInput-Settings" value={updateLastName} onChange={(e) => dispatch(updateLastName_Action(e.target.value))} type="text"/>
                <input placeholder="Birthday" className="buyerInput-Settings" value={updateBirthday} onChange={(e) => dispatch(updateBirthday_Action(e.target.value))} type="text"/>
            </div>
            <div className="buyerAccountSettings-firstContainer_twoSide">
                <input placeholder="Email" className="buyerInput-Settings" value={updateEmail} onChange={(e) => dispatch(updateEmail_Action(e.target.value))} type="text"/>
                <input placeholder="Phone" className="buyerInput-Settings" value={updatePhone} onChange={(e) => dispatch(updatePhone_Action(e.target.value))} type="text"/>
                <input placeholder="UserName" className="buyerInput-Settings" value={updateUserName} onChange={(e) => dispatch(updateUserName_Action(e.target.value))} type="text"/>
                <input placeholder="Password" className="buyerInput-Settings" value={updatePassword} onChange={(e) => dispatch(updatePassword_Action(e.target.value))} type="text"/>
            </div>
            <div>
                <button className="buyerSettingsButtons" onClick={updateAccountHandler}> Update Account </button>
            </div>
        </div>
        <div className="buyerAccountSettings-secondContainer">
            <h3>Credit Debit Card</h3>
            <div className="buyerAccountSettings-secondContainer_oneSide">
                <input placeholder="Card Number" className="buyerInput-Settings" value={updateCardNumber} onChange={(e) => dispatch(updateCardNumber_Action(e.target.value))} type="text"/>
                <input placeholder="Expiration Date" className="buyerInput-Settings" value={updateExpirationDate} onChange={(e) => dispatch(updateExpirationDate_Action(e.target.value))} type="text"/>
            </div>
            <div className="buyerAccountSettings-secondContainer_twoSide">
                <input placeholder="CVV" className="buyerInput-Settings" value={updateCVV} onChange={(e) => dispatch(updateCVV_Action(e.target.value))} type="text"/>
                <input placeholder="Postal Code" className="buyerInput-Settings" value={updatePostalCode} onChange={(e) => dispatch(updatePostalCode_Action(e.target.value))} type="text"/>
            </div>
        </div>
    </div>
   );
};



export default Account;
