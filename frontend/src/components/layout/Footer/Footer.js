import React from 'react';
import { Link } from "react-router-dom"
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

const Footer = () => {
      return (
            <footer id='footer'>
                  <div className="leftFooter">
                        <h4>DOWNLOAD OUR APP</h4>
                        <p>Download App for Android and IOS mobile phone</p>
                        <img src={playStore} alt="playstore" />
                        <img src={appStore} alt="Appstore" />
                  </div>

                  <div className="midFooter">
                        <h1>DIGITALMART.</h1>
                        <p>Buy From Home</p>

                        <p>Copyrights 2021 &copy; MartNepal</p>
                  </div>

                  <div className="rightFooter">
                        <h4>Follow Us</h4>
                        <Link to="#">Instagram</Link>
                        <Link to="#">Youtube</Link>
                        <Link to="#">Facebook</Link>
                  </div>
            </footer>
      )
}

export default Footer