import React from 'react';
import "./Footer.css";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';

const Footer = () => {
      return (
            <div className='footer-container'>
                  <p>2022 Ecommerce rights reserved</p>
                  <p className="icons">
                        <InstagramIcon />
                        <FacebookIcon />
                  </p>
            </div>
      )
}

export default Footer