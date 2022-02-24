import React from 'react';
import ReactStarts from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const ProductCart = ({ product }) => {
      const options = {
            edit: false,
            color: "rgba(20,20,20,0.2)",
            activeColor: "tomato",
            size: window.innerWidth < 900 ? 20 : 25,
            value: product.ratings,
            isHalf: true
      }
      return (
            <Link className='productCard' to={`/product/${product._id}`}>
                  <img src={product.images[0].url} alt={product.name} />
                  <p>{product.name}</p>
                  <div>
                        <ReactStarts {...options} /> <span>({product.numOfReviews} Reviews)</span>
                  </div>
                  <span>रू{product.price}</span>
            </Link>
      )
}

export default ProductCart;