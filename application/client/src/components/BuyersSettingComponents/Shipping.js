import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    updateMailingAddress_Action, 
    updateZipCode_Action, 
    updateShipping
} from '../../redux/actions/buyersSettingsActions';

const Shipping = () => {

     // dispatch state data back to redux
     const dispatch = useDispatch();
     
     const updateMailingAddress = useSelector((state) => state.buyerSettingsReducer.mailingAddress);
     const updateZipCode = useSelector((state) => state.buyerSettingsReducer.zipCode);


     const updateShippingHandler = () => {
        dispatch(updateShipping());
    };

   return (
    <div className="buyerShippingSettings-wrapper">
        <h3>Shipping</h3>
        <div className="buyerShippingSettings-firstContainer">
            <input placeholder="Mailing address" value={updateMailingAddress} onChange={(e) => dispatch(updateMailingAddress_Action(e.target.value))} className="buyerInput-Settings" type="text"/>
            <input placeholder="Zip Code" value={updateZipCode} onChange={(e) => dispatch(updateZipCode_Action(e.target.value))} className="buyerInput-Settings" type="text"/>
        </div>
        <div>
            <button onClick={updateShippingHandler} className="buyerSettingsButtons"> Update Shipping </button>
        </div>
    </div>
   );
};



export default Shipping;