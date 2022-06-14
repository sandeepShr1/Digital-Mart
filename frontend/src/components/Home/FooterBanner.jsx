import React from 'react'
import { Link } from 'react-router-dom'
import "./FooterBanner.css";
import footerBanner from "../../images/headphones_c_1.webp"

const FooterBanner = () => {
      return (
            <div className="footer-banner-container">
                  <div className="banner-desc">
                        <div className="left">
                              <p>20% off</p>
                              <h3>Grab Now</h3>
                              <h3>Good</h3>
                              <p>Up to March</p>
                        </div>
                        <div className="right">
                              <p>Hurry Up</p>
                              <h3>Stylish</h3>
                              <p>Lorem ipsum.</p>
                              <Link to="/product">
                                    <button type="button">Buy Now</button>
                              </Link>
                        </div>

                        <img
                              src={footerBanner} className="footer-banner-image"
                        />
                  </div>
            </div>
      )
}

export default FooterBanner