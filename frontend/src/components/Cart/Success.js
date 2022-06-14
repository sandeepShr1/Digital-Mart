import React, { useEffect } from 'react';
import "./Success.css"
import { CheckCircle } from "@mui/icons-material";
import { Typography } from '@mui/material';
import { useNavigate, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { clearError, createOrder } from '../../redux/actions/orderAction';
import { useAlert } from 'react-alert';



const Success = () => {
      const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
      const { shippingInfo, cartItems } = useSelector(state => state.cart);
      const { error } = useSelector((state) => state.newOrder);
      const [searchParams] = useSearchParams();
      const refId = searchParams.get("refId");
      const history = useNavigate()
      const alert = useAlert();
      const dispatch = useDispatch()
      const order = {
            shippingInfo,
            orderItems: cartItems,
            paymentInfo: { id: refId, status: "success" },
            itemsPrice: orderInfo.subtotal,
            taxPrice: Math.floor(orderInfo.tax),
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: Math.floor(orderInfo.totalPrice)
      }
      // let pid = null;
      // cartItems && cartItems?.map(i => {
      //       pid = i.product;
      //       return pid
      // });

      // var path = "https://uat.esewa.com.np/epay/transrec";
      // var params = {
      //       amt: order.totalPrice,
      //       rid: refId,
      //       pid: pid,
      //       scd: "EPAYTEST"
      // }


      // function post(path, params) {
      //       var form = document.createElement("form");
      //       form.setAttribute("method", "POST");
      //       form.setAttribute("action", path);

      //       for (var key in params) {
      //             var hiddenField = document.createElement("input");
      //             hiddenField.setAttribute("type", "hidden");
      //             hiddenField.setAttribute("name", key);
      //             hiddenField.setAttribute("value", params[key]);
      //             form.appendChild(hiddenField);
      //       }

      //       document.getElementsByClassName("orderSuccess")[0].appendChild(form);
      //       form.submit();

      // }
      const confirmPayment = () => {
            dispatch(createOrder(order));

            alert.success("Order Placed Successfully");
            history("/orders");
      }
      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
      }, [dispatch, error, alert]);


      return (
            <div className="orderSuccess">
                  < CheckCircle />

                  <Typography>Your Order has been Placed successfully </Typography>
                  <button className='btn' onClick={confirmPayment}>View orders</button>
                  

            </div>
      )
}

export default Success