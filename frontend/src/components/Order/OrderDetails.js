import React, { useEffect } from 'react'
import "./orderDetails.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { clearError, getOrderDetails } from '../../redux/actions/orderAction';
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import { Typography } from "@mui/material";
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";

const OrderDetails = () => {

      const { orderDetails, error, loading } = useSelector(state => state.orderDetails);

      const dispatch = useDispatch();
      const { id } = useParams();
      const alert = useAlert()

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError())
            }
            dispatch(getOrderDetails(id));
      }, [dispatch, id, error, alert]);

      return (
            <>
                  {loading ? (
                        <Loader />
                  ) : (
                        <>
                              <MetaData title="Order Details" />
                              <div className="orderDetailsPage">
                                    <div className="orderDetailsContainer">
                                          <Typography component="h1">
                                                Order #{orderDetails && orderDetails._id}
                                          </Typography>
                                          <Typography>Shipping Info</Typography>
                                          <div className="orderDetailsContainerBox">
                                                <div>
                                                      <p>Name:</p>
                                                      <span>{orderDetails.user && orderDetails.user.name}</span>
                                                </div>
                                                <div>
                                                      <p>Phone:</p>
                                                      <span>
                                                            {orderDetails.shippingInfo && orderDetails.shippingInfo.phoneNo}
                                                      </span>
                                                </div>
                                                <div>
                                                      <p>Address:</p>
                                                      <span>
                                                            {orderDetails.shippingInfo &&
                                                                  `${orderDetails.shippingInfo.address},
                                                                   ${orderDetails.shippingInfo.city}, 
                                                                   ${orderDetails.shippingInfo.state}, 
                                                                   ${orderDetails.shippingInfo.pinCode}`}
                                                      </span>
                                                </div>
                                          </div>
                                          <Typography>Payment</Typography>
                                          <div className="orderDetailsContainerBox">
                                                <div>
                                                      <p>Paid</p>
                                                      {/* <p
                                                            className={
                                                                  orderDetails.paymentInfo &&
                                                                  orderDetails.paymentInfo.status === "succeeded"
                                                                        ? "greenColor"
                                                                        : "redColor"
                                                            }
                                                      >
                                                            {order.paymentInfo &&
                                                                  order.paymentInfo.status === "succeeded"
                                                                  ? "PAID"
                                                                  : "NOT PAID"}
                                                      </p> */}
                                                </div>

                                                <div>
                                                      <p>Amount:</p>
                                                      <span>रू{orderDetails.totalPrice && orderDetails.totalPrice}</span>
                                                </div>
                                          </div>

                                          <Typography>Order Status</Typography>
                                          <div className="orderDetailsContainerBox">
                                                <div>
                                                      <p
                                                            className={
                                                                  orderDetails.orderStatus && orderDetails.orderStatus === "Delivered"
                                                                        ? "greenColor"
                                                                        : "redColor"
                                                            }
                                                      >
                                                            {orderDetails.orderStatus && orderDetails.orderStatus}
                                                      </p>
                                                </div>
                                          </div>
                                    </div>

                                    <div className="orderDetailsCartItems">
                                          <Typography>Order Items:</Typography>
                                          <div className="orderDetailsCartItemsContainer">
                                                {orderDetails.orderItems &&
                                                      orderDetails.orderItems.map((item) => (
                                                            <div key={item.product}>
                                                                  <img src={item.image} alt="Product" />
                                                                  <Link to={`/product/${item.product}`}>
                                                                        {item.name}
                                                                  </Link>{" "}
                                                                  <span>
                                                                        {item.quantity} X रू{item.price} ={" "}
                                                                        <b>रू{item.price * item.quantity}</b>
                                                                  </span>
                                                            </div>
                                                      ))}
                                          </div>
                                    </div>
                              </div>
                        </>
                  )}
            </>
      )
}

export default OrderDetails