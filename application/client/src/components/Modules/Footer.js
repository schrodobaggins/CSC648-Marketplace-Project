import React from 'react'
import {BottomNavigation, BottomNavigationAction} from '@material-ui/core'
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import { NavLink } from 'react-router-dom';

function Footer() {
    return (
        <BottomNavigation className="footer-nav">
          <div className="footer-navlinks">
            <NavLink className="footer-nav-link" to="/about"> About </NavLink>
            <NavLink className="footer-nav-link" to="/contact"> Contact </NavLink>
          </div>
          <div className="footer-social">
            <BottomNavigationAction color="red" label="Facebook" value="recents" icon={<FacebookIcon  style={{fill: "#3b5998"}}/>} />
            <BottomNavigationAction label="Twitter" value="favorites" icon={<TwitterIcon  style={{fill: "#1DA1F2"}}/>} />
            <BottomNavigationAction label="Instagram" value="nearby" icon={<InstagramIcon  style={{fill: " #C13584"}}/>} />
            <BottomNavigationAction label="YouTube" value="folder" icon={<YouTubeIcon  style={{fill: "#c4302b"}}/>} />
          </div>
        </BottomNavigation>
    )
}

export default Footer;