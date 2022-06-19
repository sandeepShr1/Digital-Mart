import React, { useState, useEffect } from 'react';
import "../NewProduct.css"
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import Sidebar from "../Sidebar";
import { Button } from '@mui/material';
import {
      AttachMoney, Spellcheck, Storage,
      Description, AccountTree
} from '@mui/icons-material';
import MetaData from "../../layout/MetaData";
import { useNavigate } from "react-router-dom";
import Loader from "../../layout/Loader/Loader"
import { NEW_BANNER_RESET } from '../../../redux/constants/bannerConstants';
import { clearError, createBanner } from '../../../redux/actions/bannerActions';

const NewBanner = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate();

      const { loading, error, success } = useSelector((state) => state.banners);

      const [product, setProduct] = useState("");
      const [buttonText, setButtonText] = useState("");
      const [desc, setDesc] = useState("");
      const [smallText, setSmallText] = useState("");
      const [midText, setMidText] = useState("");
      const [largeText1, setLargeText1] = useState("");
      const [largeText2, setLargeText2] = useState("");
      const [discount, setDiscount] = useState(0);
      const [images, setImages] = useState([]);
      const [imagesPreview, setImagesPreview] = useState([]);


      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (success) {
                  alert.success("Product Created Successfully");
                  history("/admin/dashboard");
                  dispatch({ type: NEW_BANNER_RESET });
            }
      }, [dispatch, alert, error, history, success]);

      const createProductSubmitHandler = (e) => {
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
            dispatch(createBanner(myForm));

      };

      const createProductImagesChange = (e) => {
            const files = Array.from(e.target.files);

            setImages([]);
            setImagesPreview([]);

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
                  {loading ? <Loader /> : (
                        <>
                              <MetaData title="Create Banner" />
                              <div className="dashboard">
                                    <Sidebar />
                                    <div className="newProductContainer">
                                          <form
                                                className="createProductForm banner"
                                                encType="multipart/form-data"
                                                onSubmit={createProductSubmitHandler}
                                          >
                                                <h1>Create Banner</h1>

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
                                                            onChange={(e) => setButtonText(e.target.value)}
                                                      />
                                                </div>

                                                <div>
                                                      <Description />

                                                      <textarea
                                                            placeholder="Product Description"
                                                            value={desc}
                                                            onChange={(e) => setDesc(e.target.value)}
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
                                                            onChange={(e) => setMidText(e.target.value)}
                                                      />
                                                </div>
                                                <div>
                                                      <Storage />
                                                      <input
                                                            type="text"
                                                            placeholder="Large Text 1"
                                                            required
                                                            onChange={(e) => setLargeText1(e.target.value)}
                                                      />
                                                </div>
                                                <div>
                                                      <Storage />
                                                      <input
                                                            type="text"
                                                            placeholder="Large text 2"
                                                            required
                                                            onChange={(e) => setLargeText2(e.target.value)}
                                                      />
                                                </div>
                                                <div>
                                                      <Storage />
                                                      <input
                                                            type="number"
                                                            placeholder="Discount"
                                                            required
                                                            onChange={(e) => setDiscount(e.target.value)}
                                                      />
                                                </div>

                                                <div id="createProductFormFile">
                                                      <input
                                                            type="file"
                                                            name="avatar"
                                                            accept="image/*"
                                                            onChange={createProductImagesChange}
                                                            multiple
                                                      />
                                                </div>

                                                <div id="createProductFormImage">
                                                      {imagesPreview.map((image, index) => (
                                                            <img key={index} src={image} alt="Product Preview" />
                                                      ))}
                                                </div>

                                                <Button
                                                      id="createProductBtn"
                                                      type="submit"
                                                      disabled={loading ? true : false}
                                                >
                                                      Create
                                                </Button>
                                          </form>
                                    </div>
                              </div>
                        </>
                  )}
            </>
      )
}

export default NewBanner