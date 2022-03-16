import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import {
    updateBioDescription_Action, 
    updateLocation_Action, 
    updateSocialMedia_Action,
    updateProfile,
} from '../../redux/actions/sellerSettingsActions';


const Profile = () => {

    const dispatch = useDispatch();
   
    const updateBioDescription = useSelector((state) => state.sellerSettingsReducer.bioDescription);
    const updateLocation = useSelector((state) => state.sellerSettingsReducer.updateLocation);
    const updateSocialMedia = useSelector((state) => state.sellerSettingsReducer.updateSocialMedia);


    const updateProfileHandler = () => {
        dispatch(updateProfile());
    };

   return (
    <div className="sellerProfileSettings-wrapper">
        <h3>Profile</h3>
        <div className="sellerProfileSettings-firstContainer">
            <div className="containerProfileAvatarSettings">
                <img className="ProfileAvatarSettings" src="https://i.redd.it/jgvvyif33u541.jpg"/>
                <div className="ProfileAvatarSettingsMiddle">
                    <a href="url">Link</a>
                </div>
            </div>
            <input placeholder="Bio Description" className="sellerSettingsInputs" value={updateBioDescription} onChange={(e) => dispatch(updateBioDescription_Action(e.target.value))} type="text"/>
            <input placeholder="Location" className="sellerSettingsInputs" value={updateLocation} onChange={(e) => dispatch(updateLocation_Action(e.target.value))} type="text"/>
            <input placeholder="Social Media" className="sellerSettingsInputs" value={updateSocialMedia} onChange={(e) => dispatch(updateSocialMedia_Action(e.target.value))} type="text"/>
        </div>
        <div>
            <button className="sellerSettingsButtons" onClick={updateProfileHandler}> Update Profile </button>
        </div>
    </div>
   );
};



export default Profile;