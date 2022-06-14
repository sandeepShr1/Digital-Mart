import React from 'react';
import { Link } from 'react-router-dom';
import "./HeroBanner.css"
import bannerImage from "../../images/headphones_c_1.webp"

const HeaderBanner = () => {
      return (
            <div className='hero-banner-container'>
                  <div>
                        <p className="beats-solo">More Green More Cool</p>
                        <h3>Headphones</h3>
                        <h1>Amazing</h1>
                        <img src={bannerImage} alt="headphones" className='hero-banner-image' />
                  </div>
                  <div>
                        <Link to="/product">
                              <button type="button">Get Now</button>
                        </Link>
                        <div className="desc">
                              <h5>Description</h5>
                              <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Optio temporibus voluptas odio !</p>
                        </div>
                  </div>
            </div>
      )
}

export default HeaderBanner