import React, { useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux"
import { getProductDetails } from '../../redux/actions/productAction';
import Carousel from "react-material-ui-carousel"
import { useParams } from "react-router-dom";

const ProductDetails = () => {
      let { id } = useParams();
      const { loading, product, error } = useSelector(state => state.productDetails)
      const dispatch = useDispatch();
      useEffect(() => {
            if (error) {
                  return alert.error(error);
            }
            dispatch(getProductDetails(id));

      }, [dispatch, error, id]);
      return (
            <>
                  <div className="ProductDetails">
                        <div>
                              {product && product.map((p) => {
                                    return <div>
                                          <h2>{p.name}</h2>
                                    </div>
                              })}
                        </div>
                  </div>
            </>
      )
}

export default ProductDetails