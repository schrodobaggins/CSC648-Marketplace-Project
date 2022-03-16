
import { NavLink } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux';
import ScheduleCalendar from '../ScheduleCalendar/CalenderComponents'; 
import NavBar from '../Modules/NavBar';
import Footer from '../Modules/Footer';


const SellerWorkScheduleSettings = () => {

  
   return (
    <div className="sellerWorkScheduleSettings-wrapper">
        <NavBar page={"workSchedule"}/>
        <h3>Schedule Set Up</h3>
        <div className="sellerWorkScheduleSettings-firstContainer">
            <p>This will navigate to the other page when you set up your schedule. Remember, the more hours you work, the more money you have!</p>
            <NavLink className="nav-link" to="/set-workSchedule"><button className="sellerSettingsButtons"> Set Up your Schedule </button></NavLink>
        </div>
        
    </div>
   );
};



export default SellerWorkScheduleSettings;