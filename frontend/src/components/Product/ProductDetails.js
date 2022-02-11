import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { useParams } from 'react-router-dom';
import Carousel from 'react-material-ui-carousel'
import { getProductDetails } from "../../redux/actions/productActions";

const ProductDetails = () => {
      const { id } = useParams();
      const { product, loading, error } = useSelector(state => state.productDetails);
      const dispatch = useDispatch();

      useEffect(() => {
            if (error) {
                  return alert.error(error);
            }
            dispatch(getProductDetails(id));

      }, [dispatch, id, error]);
      return (
            <div>
                  <Carousel>
                        {product.images &&
                              product.images.map((item, i) => (
                                    <img
                                          className="CarouselImage"
                                          key={i}
                                          src={item.url}
                                          alt={`${i} Slide`}
                                    />
                              ))}
                  </Carousel>
                  {JSON.stringify(product)}

            </div>
      )
}

export default ProductDetails