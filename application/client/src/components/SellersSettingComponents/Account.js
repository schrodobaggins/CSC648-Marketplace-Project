import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    updateFirstName,
    updateLastName,
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
} from '../../redux/actions/sellerSettingsActions';


const Account = () => {

    // dispatch state data back to redux
    const dispatch = useDispatch();
   
    const updateFirst = useSelector((state) => state.sellerSettingsReducer.firstName);
    const updateLast = useSelector((state) => state.sellerSettingsReducer.lastName);
    const updateBirthday = useSelector((state) => state.sellerSettingsReducer.birthday); 
    const updateEmail = useSelector((state) => state.sellerSettingsReducer.email);
    const updatePhone = useSelector((state) => state.sellerSettingsReducer.phone);
    const updateUserName = useSelector((state) => state.sellerSettingsReducer.username);
    const updatePassword = useSelector((state) => state.sellerSettingsReducer.password);
    const updateCardNumber = useSelector((state) => state.sellerSettingsReducer.cardNumber);
    const updateExpirationDate = useSelector((state) => state.sellerSettingsReducer.cardExpirationDate);
    const updateCVV = useSelector((state) => state.sellerSettingsReducer.cardCVV);
    const updatePostalCode = useSelector((state) => state.sellerSettingsReducer.cardPostalCode);

    const updateAccountHandler = () => {
        dispatch(updateAccount());
    };

   return (
    <div className="sellerAccountSettings-wrapper">
        <div className="sellerAccountSettings-firstContainer">
            <h3>Information</h3>
            <div className="sellerAccountSettings-firstContainer_oneSide">
                <input placeholder="First Name" className="sellerSettingsInputs" value={updateFirst} onChange={(e) => dispatch(updateFirstName(e.target.value))} type="text"/>
                <input placeholder="Last Name" className="sellerSettingsInputs" value={updateLast} onChange={(e) => dispatch(updateLastName(e.target.value))} type="text"/>
                <input placeholder="Birthday" className="sellerSettingsInputs" value={updateBirthday} onChange={(e) => dispatch(updateBirthday_Action(e.target.value))} type="date"/>
            </div>
            <div className="sellerAccountSettings-firstContainer_twoSide">
                <input placeholder="Email" className="sellerSettingsInputs" value={updateEmail} onChange={(e) => dispatch(updateEmail_Action(e.target.value))} type="text"/>
                <input placeholder="Phone" className="sellerSettingsInputs" value={updatePhone} onChange={(e) => dispatch(updatePhone_Action(e.target.value))} type="text"/>    
                <input placeholder="UserName" className="sellerSettingsInputs" value={updateUserName} onChange={(e) => dispatch(updateUserName_Action(e.target.value))} type="text"/>
                <input placeholder="Password" className="sellerSettingsInputs" value={updatePassword} onChange={(e) => dispatch(updatePassword_Action(e.target.value))} type="text"/>
            </div>
            <div>
                <button className="sellerSettingsButtons" onClick={updateAccountHandler}> Update Account </button>
            </div>
        </div>
        <div className="sellerAccountSettings-secondContainer">
            <h3>Credit Debit Card</h3>
            <div className="sellerAccountSettings-secondContainer_oneSide">
                <input placeholder="Card Number" className="sellerSettingsInputs" value={updateCardNumber} onChange={(e) => dispatch(updateCardNumber_Action(e.target.value))} type="text"/>
                <input placeholder="Expiration Date" className="sellerSettingsInputs" value={updateExpirationDate} onChange={(e) => dispatch(updateExpirationDate_Action(e.target.value))} type="text"/>
            </div>
            <div className="sellerAccountSettings-secondContainer">
                <input placeholder="CVV" className="sellerSettingsInputs" value={updateCVV} onChange={(e) => dispatch(updateCVV_Action(e.target.value))} type="text"/>
                <input placeholder="Postal Code" className="sellerSettingsInputs" value={updatePostalCode} onChange={(e) => dispatch(updatePostalCode_Action(e.target.value))} type="text"/>
            </div>
        </div>
    </div>
   );
};



export default Account;
