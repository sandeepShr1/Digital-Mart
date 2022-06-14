import React from 'react';
import "./Cart.css";
import { Link, useNavigate } from "react-router-dom"
import CartItemCard from './cartItemCard';
import { addToCart, removeFromCart } from "../../redux/actions/cartActions"
import { useDispatch, useSelector } from "react-redux";
import Typography from '@mui/material/Typography';
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart"
import MetaData from '../layout/MetaData';

const Cart = () => {
      const { cartItems } = useSelector(state => state.cart)
      const dispatch = useDispatch();
      const history = useNavigate();

      const increaseQuantity = (id, quantity, stock) => {
            const newQty = quantity + 1;
            if (stock <= quantity) {
                  return;
            }
            dispatch(addToCart(id, newQty))
      }

      const decreaseQuantity = (id, quantity) => {
            const newQty = quantity - 1;
            if (quantity <= 1) {
                  return;
            }
            dispatch(addToCart(id, newQty))
      }

      const deleteFromCart = (id) => {
            dispatch(removeFromCart(id))
      }

      const checkoutHandler = () => {
            history("/login?redirect=shipping")
      }

      return (
            <>
                  <MetaData title="Cart" />
                  {cartItems.length === 0 ? (
                        <div className="emptyCart">
                              <RemoveShoppingCartIcon />
                              <Typography >No Product in Your Cart</Typography>
                              <Link to="/products">View Products</Link>
                        </div>
                  ) : (
                        <>
                              <div className="cartPage">
                                    <div className="cartHeader">
                                          <p>Product</p>
                                          <p>Quantity</p>
                                          <p>SubTotal</p>
                                    </div>

                                    {cartItems && cartItems.map((item) => {
                                          return <div key={item.product} className="cartContainer">
                                                <CartItemCard item={item} deleteFromCart={deleteFromCart} />
                                                <div className="cartInput">
                                                      <button onClick={() => decreaseQuantity(item.product, item.quantity)}>-</button>
                                                      <span>{item.quantity}</span>
                                                      <button onClick={() => increaseQuantity(item.product, item.quantity, item.stock)} >+</button>
                                                </div>
                                                <p className="cartSubtotal">{`रू${item.price * item.quantity}`}</p>
                                          </div>
                                    })}

                                    <div className="cartGrossTotal">
                                          <div></div>
                                          <div className="cartGrossTotalBox">
                                                <p>Gross Total</p>
                                                <p>{`रू${cartItems.reduce((acc, item) => acc + item.quantity * item.price, 0)}`}</p>
                                          </div>
                                          <div></div>
                                          <div className="checkOutBtn">
                                                <button onClick={checkoutHandler}>Check Out</button>
                                          </div>

                                    </div>
                              </div>
                        </>
                  )}
            </>
      )
}

export default Cart