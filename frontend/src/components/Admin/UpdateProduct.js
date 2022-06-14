import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, getProductDetails, updateProduct } from "../../redux/actions/productActions";
import { UPDATE_PRODUCT_RESET } from "../../redux/constants/productConstants"
import Sidebar from "./Sidebar";
import { Button } from '@mui/material';
import {
      AttachMoney, Spellcheck, Storage,
      Description, AccountTree
} from '@mui/icons-material';
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader"


const UpdateProduct = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate();
      const { id } = useParams();

      const { loading, error: updateError, isUpdated } = useSelector((state) => state.product);
      const { error, product } = useSelector(state => state.productDetails)

      const [name, setName] = useState("");
      const [price, setPrice] = useState(0);
      const [description, setDescription] = useState("");
      const [category, setCategory] = useState("");
      const [stock, setStock] = useState(0);
      const [images, setImages] = useState([]);
      const [oldImages, setOldImages] = useState([]);
      const [imagesPreview, setImagesPreview] = useState([]);

      const categories = [
            "Laptop",
            "Footwear",
            "Bottom",
            "Tops",
            "Attire",
            "Camera",
            "SmartPhones",
      ];

      useEffect(() => {
            if (product && product._id !== id) {
                  dispatch(getProductDetails(id));
            } else {
                  setName(product.name);
                  setPrice(product.price);
                  setDescription(product.description);
                  setCategory(product.category);
                  setStock(product.stock);
                  setOldImages(product.images);
            }

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (updateError) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (isUpdated) {
                  alert.success("Product Updated Successfully");
                  history("/admin/products");
                  dispatch({ type: UPDATE_PRODUCT_RESET });
            }
      }, [dispatch, alert, error, history, isUpdated, id, product, updateError]);

      const updateProductSubmitHandler = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("name", name);
            myForm.set("price", price);
            myForm.set("description", description);
            myForm.set("category", category);
            myForm.set("stock", stock);

            images.forEach((image) => {
                  myForm.append("images", image);
            });
            dispatch(updateProduct(id, myForm));

      };

      const updateProductImagesChange = (e) => {
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
                                                      className="createProductForm"
                                                      encType="multipart/form-data"
                                                      onSubmit={updateProductSubmitHandler}
                                                >
                                                      <h1>update Product</h1>

                                                      <div>
                                                            <Spellcheck />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Product Name"
                                                                  required
                                                                  value={name}
                                                                  onChange={(e) => setName(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <AttachMoney />
                                                            <input
                                                                  type="number"
                                                                  placeholder="Price"
                                                                  required
                                                                  value={price}
                                                                  onChange={(e) => setPrice(e.target.value)}
                                                            />
                                                      </div>

                                                      <div>
                                                            <Description />

                                                            <textarea
                                                                  placeholder="Product Description"
                                                                  value={description}
                                                                  onChange={(e) => setDescription(e.target.value)}
                                                                  cols="30"
                                                                  rows="1"
                                                            ></textarea>
                                                      </div>

                                                      <div>
                                                            <AccountTree />
                                                            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                                                                  <option value="">Choose Category</option>
                                                                  {categories.map((cate) => (
                                                                        <option key={cate} value={cate}>
                                                                              {cate}
                                                                        </option>
                                                                  ))}
                                                            </select>
                                                      </div>

                                                      <div>
                                                            <Storage />
                                                            <input
                                                                  type="number"
                                                                  placeholder="Stock"
                                                                  required
                                                                  value={stock}
                                                                  onChange={(e) => setStock(e.target.value)}
                                                            />
                                                      </div>

                                                      <div id="createProductFormFile">
                                                            <input
                                                                  type="file"
                                                                  name="avatar"
                                                                  accept="image/*"
                                                                  onChange={updateProductImagesChange}
                                                                  multiple
                                                            />
                                                      </div>

                                                      <div id="createProductFormImage">
                                                            {oldImages && oldImages.map((image, index) => (
                                                                  <img key={index} src={image.url} alt="product preview" loading='lazy' />
                                                            ))}
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

export default UpdateProduct