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
      const history = useNavigate();

      const alert = useAlert();
      const dispatch = useDispatch();
      const hName = window.location.host;


      const order = {
            shippingInfo,
            orderItems: cartItems,
            paymentInfo: { id: null, status: "fail" },
            itemsPrice: orderInfo.subtotal,
            taxPrice: Math.floor(orderInfo.tax),
            shippingPrice: orderInfo.shippingCharges,
            totalPrice: Math.floor(orderInfo.totalPrice)
      }
      let pid = null;
      cartItems && cartItems?.map(i => {
            pid = i.product;
            return pid
      });

      const submitHandler = (e) => {
            e.preventDefault();
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
            <>
                  <MetaData title="Payment" />
                  <CheckoutSteps activeStep={2} />

                  < div className="paymentContainer1" >

                        <form className='paymentForm' action="https://uat.esewa.com.np/epay/main" method="POST">
                              <input value={order.totalPrice} name="tAmt" type="hidden" />
                              <input value={order.itemsPrice} name="amt" type="hidden" />
                              <input value={order.taxPrice} name="txAmt" type="hidden" />
                              <input value="0" name="psc" type="hidden" />
                              <input value={order.shippingPrice} name="pdc" type="hidden" />
                              <input value="EPAYTEST" name="scd" type="hidden" />
                              <input value={pid} name="pid" type="hidden" />
                              <input value={`http://${hName}/success?q=su`} type="hidden" name="su" />
                              <input value={`http://${hName}/failed?q=fu`} type="hidden" name="fu" />
                              <button className='btn' type='submit' >Pay with esewa</button>
                        </form>

                        <h3>Pay on Delivery</h3>
                        <form className='paymentForm' >
                              <button className='btn' onClick={submitHandler}>Pay on Delivery</button>
                        </form>
                  </div>

            </>
      )
}

export default Payment