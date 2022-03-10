import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'
import { useDispatch, useSelector } from "react-redux"
import CheckoutSteps from './CheckoutSteps';
import { createOrder, clearError } from "../../redux/actions/orderAction";
import "./Payment.css"
import { useAlert } from "react-alert";

const Payment = () => {
      // const data = JSON.parse(sessionStorage.getItem("orderInfo"));

      const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));
      const { shippingInfo, cartItems } = useSelector(state => state.cart)
      // const { user } = useSelector(state => state.user)
      const { error } = useSelector((state) => state.newOrder);

      const alert = useAlert();
      const dispatch = useDispatch();


      const order = {
            shippingInfo,
            orderItems: cartItems,
            paymentInfo: { id: "112rw", status: "success" },
            itemsPrice: orderInfo.subtotal,
            taxPrice: Math.floor(orderInfo.tax),
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: Math.floor(orderInfo.totalPrice)
      }

      const history = useNavigate();

      const submitHandler = (e) => {
            e.preventDefault();
            dispatch(createOrder(order))
            history("/success");

      }
      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
      }, [dispatch, error, alert]);


      return (
            <>
                  <MetaData title="Payment" />
                  <CheckoutSteps activeStep={2} />

                  < div className="paymentContainer1" >
                        <h3>Pay on Delivery</h3>
                        <form className='paymentForm' >
                              <button className='btn' onClick={submitHandler}>Pay with cash</button>
                        </form>
                  </div>

            </>
      )
}

export default Payment