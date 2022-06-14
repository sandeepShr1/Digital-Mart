import React from 'react';
import { Link } from 'react-router-dom';


const ProductCart = ({ product }) => {
      return (
            <div>
                  <Link to={`/product/${product._id}`}>
                        <div className="product-card">
                              <img
                                    src={product.images[0].url}
                                    alt={product.name}
                                    width={250}
                                    height={250}
                                    loading="lazy"
                                    className='product-image'
                              />
                              <p className='product-name'>{product.name}</p>
                              <p className='product-price'>रू {product.price}</p>
                        </div>

                  </Link>
            </div>
      )
}

export default ProductCart;