import React from 'react';
import "./cartItemCard.css"
import { Link } from "react-router-dom";

const cartItemCard = ({ item, deleteFromCart }) => {
      return (
            <div className="CartItemCard">
                  <img src={item.image} alt="ssa" loading='lazy' />
                  <div>
                        <Link to={`/product/${item.product}`}>{item.name}</Link>
                        <span>{`Price: Rs${item.price}`}</span>
                        <p onClick={() => deleteFromCart(item.product)} >Remove</p>
                  </div>
            </div>
      )
}

export default cartItemCard