import React from 'react'
import { CheckCircle } from "@mui/icons-material";
import { Typography } from '@mui/material';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { createOrder } from '../../redux/actions/orderAction';
const ValidatePayment = () => {

      const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
      const { shippingInfo, cartItems } = useSelector(state => state.cart);
      const [searchParams] = useSearchParams();
      const refId = searchParams.get("refId");
      const dispatch = useDispatch();
      const history = useNavigate();
      console.log(refId)
      const order = {
            shippingInfo,
            orderItems: cartItems,
            // paymentInfo: { id: "112rw", status: "success" },
            itemsPrice: orderInfo.subtotal,
            taxPrice: Math.floor(orderInfo.tax),
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: Math.floor(orderInfo.totalPrice)
      }
      const confirmPayment = (e) => {
            e.preventDefault();
            dispatch(createOrder(order))
            history("/orders");
      }
      return (
            <div>
                  < CheckCircle />
                  <Typography>Your Order has been Placed successfully </Typography>
            </div>
      )
}

export default ValidatePayment