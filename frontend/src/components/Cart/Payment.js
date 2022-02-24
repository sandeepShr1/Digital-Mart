import React from 'react'
import { useNavigate } from 'react-router-dom';
import MetaData from '../layout/MetaData'

import CheckoutSteps from './CheckoutSteps';
import "./Payment.css"

const Payment = () => {
      // const data = JSON.parse(sessionStorage.getItem("orderInfo"));

      const history = useNavigate();
      const submitHandler = (e) => {
            e.preventDefault()
            history("/success")
      }

      return (
            <>
                  <MetaData title="Payment" />
                  <CheckoutSteps activeStep={2} />
                  <div className="paymentContainer">
                        <h3>Pay with Esewa </h3>
                        <form className='paymentForm' >

                              <button className='btn' onClick={submitHandler}>Pay with Esewa</button>
                        </form>
                        {/* <form className='paymentForm' action="https://uat.esewa.com.np/epay/main" method="POST">
                              <input value={data.totalPrice} name="tAmt" type="hidden" />
                              <input value={data.subtotal} name="amt" type="hidden" />
                              <input value={data.tax} name="txAmt" type="hidden" />
                              <input value={data.shippingCharges} name="psc" type="hidden" />
                              <input value="0" name="pdc" type="hidden" />
                              <input value="EPAYTEST" name="scd" type="hidden" />
                              <input value="e2332" name="pid" type="hidden" />
                              <input value="http://merchant.com.np/page/esewa_payment_success?q=su" type="hidden" name="su" />
                              <input value="http://merchant.com.np/page/esewa_payment_failed?q=fu" type="hidden" name="fu" />
                              <input className='btn' value="Pay with Esewa" type="submit" />
                        </form> */}
                  </div>

                  <div className="paymentContainer1">
                        <h3>Pay on Delivery</h3>
                        <form className='paymentForm' >

                              <button className='btn'>Pay with cash</button>
                        </form>
                  </div>

            </>
      )
}

export default Payment