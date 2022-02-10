import React from 'react';
import ReactStarts from "react-rating-stars-component";
import { Link } from 'react-router-dom';


const Product = ({ product }) => {
      const options = {
            edit: false,
            color: "rgba(20,20,20,0.2)",
            activeColor: "tomato",
            size: window.innerWidth < 600 ? 20 : 25,
            value: product.rating,
            isHalf: true
      }
      return (
            <Link className='productCard' to={product._id}>
                  {/* <img src={product.images[0].url} alt={product.name} /> */}
                  <p>{product.name}</p>
                  <div>
                        <ReactStarts {...options} /> <span>({product.numOfReviews} Reviews)</span>
                  </div>
                  <span>{product.price}</span>
            </Link>
      )
}

export default Product;