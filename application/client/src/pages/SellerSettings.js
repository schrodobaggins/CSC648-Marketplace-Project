import React, {useEffect, useState} from 'react';
import NavBar from '../components/Modules/NavBar';
import ProductCreationForm from '../components/ProductCreationForm';
import { connect, useDispatch } from 'react-redux';
import AccountSellers from '../components/SellersSettingComponents/Account'; 
import ActivitiesSellers from '../components/SellersSettingComponents/Activities';
import ProfileSellers from '../components/SellersSettingComponents/Profile';
import WorkScheduleSellers from '../components/SellersSettingComponents/WorkSchedule';
import HamburgerMenu from '../components/Modules/HamburgerMenu';

const SellerSettings = (props) => {

    // test comment for showing multiple commits in a pull request 

    
    const [toggleAccount, set_toggleAccount] = useState(false); 
    const [toggleProfile, set_toggleProfile] = useState(false); 
    const [toggleProducts, set_toggleProducts] = useState(false); 
    const [toggleWorkSchedule, set_toggleWorkSchedule] = useState(false); 
    const [toggleActivities, set_toggleActivities] = useState(false); 

    const toggleAccount_func = () => {
      set_toggleAccount(!toggleAccount); 

      if (toggleProfile) {
        set_toggleProfile(!toggleProfile); 
      }
      if (toggleProducts) {
        set_toggleProducts(!toggleProducts); 
      }
      if (toggleWorkSchedule) {
        set_toggleWorkSchedule(!toggleWorkSchedule); 
      }
      if (toggleActivities) {
        set_toggleActivities(!toggleActivities); 
      }
    }

    const toggleProfile_func = () => {
      set_toggleProfile(!toggleProfile); 

      if (toggleAccount) {
        set_toggleAccount(!toggleAccount); 
      }
      if (toggleProducts) {
        set_toggleProducts(!toggleProducts); 
      }
      if (toggleWorkSchedule) {
        set_toggleWorkSchedule(!toggleWorkSchedule); 
      }
      if (toggleActivities) {
        set_toggleActivities(!toggleActivities); 
      }
    }

    const toggleProducts_func = () => {
      set_toggleProducts(!toggleProducts); 

      if (toggleAccount) {
        set_toggleAccount(!toggleAccount); 
      }
      if (toggleProfile) {
        set_toggleProfile(!toggleProfile); 
      }
      if (toggleWorkSchedule) {
        set_toggleWorkSchedule(!toggleWorkSchedule); 
      }
      if (toggleActivities) {
        set_toggleActivities(!toggleActivities); 
      }
    }

    const toggleWorkSchedule_func = () => {
      set_toggleWorkSchedule(!toggleWorkSchedule); 
      if (toggleAccount) {
        set_toggleAccount(!toggleAccount); 
      }
      if (toggleProfile) {
        set_toggleProfile(!toggleProfile); 
      }
      if (toggleProducts) {
        set_toggleProducts(!toggleProducts); 
      }
      if (toggleActivities) {
        set_toggleActivities(!toggleActivities); 
      }
    }

    const toggleActivities_func = () => {
      set_toggleActivities(!toggleActivities); 
      if (toggleAccount) {
        set_toggleProfile(!toggleAccount); 
      }
      if (toggleProfile) {
        set_toggleProfile(!toggleProfile); 
      }
      if (toggleProducts) {
        set_toggleProducts(!toggleProducts); 
      }
      if (toggleWorkSchedule) {
        set_toggleWorkSchedule(!toggleWorkSchedule); 
      }
    }


    return (
        <div>
            <NavBar page={"sellerSettings"}/>

            <h1>Seller Settings</h1>
            <div className="seller-settings-wrapper">
              <ul className="seller-selections">
                <li onClick={toggleProfile_func}>Profile</li>
                <li onClick={toggleProducts_func}>Products</li>
                <li onClick={toggleAccount_func}>Account</li>
                <li onClick={toggleWorkSchedule_func}>Work Schedule</li>
                <li onClick={toggleActivities_func}>Activities</li>
              </ul>
              <div className="seller-selection-area">
                {toggleAccount !== false? <AccountSellers/> : null}
                {toggleProfile !== false? <ProfileSellers/> : null}
                {toggleProducts !== false? <ProductCreationForm/> : null}
                {toggleWorkSchedule !== false? <WorkScheduleSellers/> : null}
                {toggleActivities !== false? <ActivitiesSellers/> : null}
              </div>
            </div>
            
        </div>
    );
};

function mapStateToProps(state) {
    return { 
      displayProducts: state.sellerSettingsReducer.displayProducts
    };
  }

export default connect(mapStateToProps)(SellerSettings);