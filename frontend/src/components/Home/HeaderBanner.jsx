import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./HeroBanner.css"
import { useDispatch, useSelector } from 'react-redux';
import { clearError, getBanner } from '../../redux/actions/bannerActions';
import { useAlert } from 'react-alert';

const HeaderBanner = () => {
      const alert = useAlert();
      const dispatch = useDispatch();
      const { error, banners } = useSelector(state => state.banners)

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            dispatch(getBanner());
      }, [dispatch, alert, error]);




      return (
            <div className='hero-banner-container'>
                  <div>
                        <p className="beats-solo">{banners[2] && banners[2].midText}</p>
                        <h3>{banners[2] && banners[2].product}</h3>
                        <h1>{banners[2] && banners[2].largeText1}</h1>
                        <img src={banners[2] && banners[2].images[0].url} alt="headphones" className='hero-banner-image' />
                  </div>
                  <div>
                        <Link to="/products">
                              <button type="button">{banners[2] && banners[2].buttonText}</button>
                        </Link>
                        <div className="desc">
                              <h5>Description</h5>
                              <p>{banners[2] && banners[2].desc}</p>
                        </div>
                  </div>
            </div>
      )
}

export default HeaderBanner