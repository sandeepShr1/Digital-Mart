import React from 'react'
import { Link } from 'react-router-dom'
import "./FooterBanner.css";
import { useSelector, useDispatch } from 'react-redux'
import { useEffect } from 'react';
import { clearError, getBanner } from "../../redux/actions/bannerActions"

const FooterBanner = () => {
      const { banners, error } = useSelector(state => state.banners);
      const dispatch = useDispatch();

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            dispatch(getBanner());
      }, [dispatch, error]);


      return (
            <div className="footer-banner-container">
                  <div className="banner-desc">
                        <div className="left">
                              <p>{banners[0]?.discount} % off.</p>
                              <h3>{banners[0]?.buttonText}</h3>
                              <h3>{banners[0]?.largeText1}</h3>
                              <p>Up to March</p>
                        </div>
                        <div className="right">
                              <p>Hurry Up</p>
                              <h3>{banners[0]?.largeText2}</h3>
                              <p>{banners[0]?.desc}</p>
                              <Link to="/product">
                                    <button type="button">{banners[0]?.buttonText}</button>
                              </Link>
                        </div>

                        <img
                              src={banners[0]?.images[0]?.url} className="footer-banner-image" alt="footerImg"
                        />
                  </div>
            </div>
      )
}

export default FooterBanner;