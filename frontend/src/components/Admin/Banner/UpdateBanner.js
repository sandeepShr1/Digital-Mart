import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Sidebar from "../Sidebar";
import { Button } from '@mui/material';
import {
      AttachMoney, Spellcheck, Storage,
      Description, AccountTree
} from '@mui/icons-material';
import MetaData from "../../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../layout/Loader/Loader"
import { clearError, getBannerDetails, updateBanner } from '../../../redux/actions/bannerActions';
import { SINGLE_BANNER_RESET, UPDATE_BANNER_RESET } from '../../../redux/constants/bannerConstants';


const UpdateBanner = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate();
      const { id } = useParams();

      const { loading, isUpdated, error, banner } = useSelector((state) => state.banners);
      const [product, setProduct] = useState("");
      const [buttonText, setButtonText] = useState("");
      const [desc, setDesc] = useState("");
      const [smallText, setSmallText] = useState("");
      const [midText, setMidText] = useState("");
      const [largeText1, setLargeText1] = useState("");
      const [largeText2, setLargeText2] = useState("");
      const [discount, setDiscount] = useState(0);
      const [images, setImages] = useState([]);
      const [oldImages, setOldImages] = useState([]);
      const [imagesPreview, setImagesPreview] = useState([]);

      useEffect(() => {
            if (banner && banner._id !== id) {
                  dispatch(getBannerDetails(id));
            } else {
                  setProduct(banner.product);
                  setButtonText(banner.buttonText);
                  setDesc(banner.desc);
                  setSmallText(banner.smallText);
                  setMidText(banner.midText);
                  setLargeText1(banner.largeText1);
                  setLargeText2(banner.largeText2);
                  setDiscount(banner.discount);
                  setOldImages(banner.images);
            }

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (isUpdated) {
                  alert.success("Banner Updated Successfully");
                  history("/admin/banners");
                  dispatch({ type: UPDATE_BANNER_RESET });
                  dispatch({ type: SINGLE_BANNER_RESET });
            }
      }, [dispatch, alert, error, history, isUpdated, id, banner]);

      const updateBannerSubmitHandler = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("product", product);
            myForm.set("buttonText", buttonText);
            myForm.set("desc", desc);
            myForm.set("smallText", smallText);
            myForm.set("midText", midText);
            myForm.set("largeText1", largeText1);
            myForm.set("largeText2", largeText2);
            myForm.set("discount", discount);

            images.forEach((image) => {
                  myForm.append("images", image);
            });
            dispatch(updateBanner(id, myForm));

      };

      const updateBannerImagesChange = (e) => {
            const files = Array.from(e.target.files);

            setImages([]);
            setImagesPreview([]);
            setOldImages([]);

            files.forEach((file) => {
                  const reader = new FileReader();

                  reader.onload = () => {
                        if (reader.readyState === 2) {
                              setImagesPreview((old) => [...old, reader.result]);
                              setImages((old) => [...old, reader.result]);
                        }
                  };

                  reader.readAsDataURL(file);
            });
      };

      return (
            <>
                  {
                        loading ? <Loader /> : (
                              <>
                                    <MetaData title="update Product" />
                                    <div className="dashboard">
                                          <Sidebar />
                                          <div className="newProductContainer">
                                                <form
                                                      className="createProductForm banner"
                                                      encType="multipart/form-data"
                                                      onSubmit={updateBannerSubmitHandler}
                                                >
                                                      <h1>Update Banner</h1>

                                                      <div>
                                                            <Spellcheck />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Product Name"
                                                                  required
                                                                  value={product}
                                                                  onChange={(e) => setProduct(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <AttachMoney />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Button Text"
                                                                  required
                                                                  value={buttonText}
                                                                  onChange={(e) => setButtonText(e.target.value)}
                                                            />
                                                      </div>

                                                      <div>
                                                            <Description />

                                                            <textarea
                                                                  placeholder="Banner Description"
                                                                  onChange={(e) => setDesc(e.target.value)}
                                                                  value={desc}
                                                                  cols="30"
                                                                  rows="1"
                                                            ></textarea>
                                                      </div>

                                                      <div>
                                                            <AccountTree />
                                                            <input
                                                                  placeholder="Small Text"
                                                                  value={smallText}
                                                                  onChange={(e) => setSmallText(e.target.value)}
                                                                  type="text"
                                                                  required
                                                            ></input>
                                                      </div>

                                                      <div>
                                                            <Storage />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Mid Text"
                                                                  required
                                                                  value={midText}
                                                                  onChange={(e) => setMidText(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <Storage />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Large Text 1"
                                                                  required
                                                                  value={largeText1}
                                                                  onChange={(e) => setLargeText1(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <Storage />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Large text 2"
                                                                  required
                                                                  value={largeText2}
                                                                  onChange={(e) => setLargeText2(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <Storage />
                                                            <input
                                                                  type="number"
                                                                  placeholder="Discount"
                                                                  required
                                                                  value={discount}
                                                                  onChange={(e) => setDiscount(e.target.value)}
                                                            />
                                                      </div>

                                                      <div id="createProductFormFile">
                                                            <input
                                                                  type="file"
                                                                  name="avatar"
                                                                  accept="image/*"
                                                                  onChange={updateBannerImagesChange}
                                                                  multiple
                                                            />
                                                      </div>

                                                      <div id="createProductFormImage">
                                                            {oldImages && oldImages.map((image, index) => (
                                                                  <img key={index} src={image.url} alt="banner preview" loading='lazy' />
                                                            ))}
                                                      </div>

                                                      <div id="createProductFormImage">
                                                            {imagesPreview.map((image, index) => (
                                                                  <img key={index} src={image} alt="Banner Preview" />
                                                            ))}
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={loading ? true : false}
                                                      >
                                                            update
                                                      </Button>
                                                </form>
                                          </div>
                                    </div>
                              </>
                        )
                  }
            </>
      )
}

export default UpdateBanner;