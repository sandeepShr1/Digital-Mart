import React, { useEffect, useState } from 'react';
import "./UpdateOrder.css"
import { getOrderDetails, updateOrder, clearError } from "../../redux/actions/orderAction"
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Typography } from "@mui/material";
import SideBar from './Sidebar';
import MetaData from '../layout/MetaData';
import Loader from "../layout/Loader/Loader";
import { Link } from "react-router-dom";
import { AccountTree } from "@mui/icons-material";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import { UPDATE_ORDERS_RESET } from '../../redux/constants/orderConstants';

const UpdateOrder = () => {
      const { orderDetails, error, loading } = useSelector(state => state.orderDetails);
      const { error: updateError, isUpdated } = useSelector(state => state.order)

      const dispatch = useDispatch();
      const { id } = useParams();
      const [status, setStatus] = useState("");

      const alert = useAlert();

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError())
            }
            if (updateError) {
                  alert.error(error);
                  dispatch(clearError())
            }
            if (isUpdated) {
                  alert.success("Update order successfully");
                  dispatch({ type: UPDATE_ORDERS_RESET })
            }
            dispatch(getOrderDetails(id));
      }, [dispatch, id, error, alert, isUpdated, updateError]);

      const updateOrderSubmitHandler = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("status", status);
            dispatch(updateOrder(id, myForm));
      }

      return (
            <>
                  <MetaData title={`Process Order`} />

                  <div className="dashboard">
                        <SideBar />
                        <div className="newProductContainer">
                              {loading ? (
                                    <Loader />
                              ) : (
                                    <div
                                          className="confirmOrderPage"
                                          style={{
                                                display: orderDetails.orderStatus === "Delivered" ? "block" : "grid",
                                          }}
                                    >
                                          <div>
                                                <div className="confirmshippingArea">
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
                                                                              `${orderDetails.shippingInfo.address}, ${orderDetails.shippingInfo.city}, ${orderDetails.shippingInfo.state}, ${orderDetails.shippingInfo.pinCode}, ${orderDetails.shippingInfo.country}`}
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
                                                                        {orderDetails.paymentInfo &&
                                                                              orderDetails.paymentInfo.status === "succeeded"
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
                                                                        id={
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
                                                <div className="confirmCartItems">
                                                      <Typography>Order Items:</Typography>
                                                      <div className="confirmCartItemsContainer">
                                                            {orderDetails.orderItems &&
                                                                  orderDetails.orderItems.map((item) => (
                                                                        <div key={item.product}>
                                                                              <img src={item.image} alt="Product" loading='lazy' />
                                                                              <Link to={`/product/${item.product}`}>
                                                                                    {item.name}
                                                                              </Link>{" "}
                                                                              <span>
                                                                                    {item.quantity} X ₹{item.price} ={" "}
                                                                                    <b>रू{item.price * item.quantity}</b>
                                                                              </span>
                                                                        </div>
                                                                  ))}
                                                      </div>
                                                </div>
                                          </div>
                                          {/*  */}
                                          <div
                                                style={{
                                                      display: orderDetails.orderStatus === "Delivered" ? "none" : "block",
                                                }}
                                          >
                                                <form
                                                      className="updateOrderForm"
                                                      onSubmit={updateOrderSubmitHandler}
                                                >
                                                      <h1>Process Order</h1>

                                                      <div>
                                                            <AccountTree />
                                                            <select onChange={(e) => setStatus(e.target.value)}>
                                                                  <option value="">Choose Category</option>
                                                                  {orderDetails.orderStatus === "Processing" && (
                                                                        <option value="Shipped">Shipped</option>
                                                                  )}

                                                                  {orderDetails.orderStatus === "Shipped" && (
                                                                        <option value="Delivered">Delivered</option>
                                                                  )}
                                                            </select>
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={
                                                                  loading ? true : false || status === "" ? true : false
                                                            }
                                                      >
                                                            Process
                                                      </Button>
                                                </form>
                                          </div>
                                    </div>
                              )}
                        </div>
                  </div>
            </>
      )
}

export default UpdateOrder