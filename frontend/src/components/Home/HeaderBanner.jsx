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
      const i = 0;
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
                        <p classsName="beats-solo">{banners[i] && banners[i].midText}</p>
                        <h3>{banners[i] && banners[i].product}</h3>
                        <h1>{banners[i] && banners[i].largeText1}</h1>
                        <img src={banners[i] && banners[i].images[i].url} alt="headphones" className='hero-banner-image' />
                  </div>
                  <div>
                        <Link to="/products">
                              <button type="button">{banners[i] && banners[i].buttonText}</button>
                        </Link>
                        <div className="desc">
                              <h5>Description</h5>
                              <p>{banners[i] && banners[i].desc}</p>
                        </div>
                  </div>
            </div>
      )
}

export default HeaderBanner