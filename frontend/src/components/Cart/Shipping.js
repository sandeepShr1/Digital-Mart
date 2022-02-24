import React, { useState } from 'react';
import "./Shipping.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import {
      PinDrop, Home,
      LocationCity,
      Phone, TransferWithinAStation
} from "@mui/icons-material";
import CheckoutSteps from "./CheckoutSteps.js";
import { saveShippingInfo } from "../../redux/actions/cartActions"


const Shipping = () => {

      const State = [
            { name: "Province No. 1" },
            { name: "Madhesh Province" },
            { name: "Bagmati Province" },
            { name: "Gandaki Province" },
            { name: "Lumbini Province" },
            { name: "Karnali Province" },
            { name: "Sudurpashchim Province" }
      ]

      const dispatch = useDispatch();
      const Alert = useAlert();
      const history = useNavigate();

      const { shippingInfo } = useSelector(state => state.cart);

      const [address, setAddress] = useState(shippingInfo.address);
      const [city, setCity] = useState(shippingInfo.city);
      const [state, setState] = useState(shippingInfo.state);
      const [pinCode, setPinCode] = useState(shippingInfo.pinCode);
      const [phoneNo, setPhoneNo] = useState(shippingInfo.phoneNo);

      const shippingSubmit = (e) => {
            e.preventDefault();

            if (phoneNo.length < 10 || phoneNo.length > 10) {
                  Alert.error("Phone number must be 10 digit");
                  return;
            }
            dispatch(saveShippingInfo({ address, city, state, pinCode, phoneNo }))
            history("/order/confirm")
      }

      return (
            <>
                  <MetaData title="Shipping Details" />

                  <CheckoutSteps activeStep={0} />

                  <div className="shippingContainer">
                        <div className="shippingBox">
                              <h2 className="shippingHeading">Shipping Details</h2>

                              <form
                                    className="shippingForm"
                                    encType="multipart/form-data"
                                    onSubmit={shippingSubmit}
                              >
                                    <div>
                                          <Home />
                                          <input
                                                type="text"
                                                placeholder="Address"
                                                required
                                                value={address}
                                                onChange={(e) => setAddress(e.target.value)}
                                          />
                                    </div>

                                    <div>
                                          <LocationCity />
                                          <input
                                                type="text"
                                                placeholder="City"
                                                required
                                                value={city}
                                                onChange={(e) => setCity(e.target.value)}
                                          />
                                    </div>

                                    <div>
                                          <PinDrop />
                                          <input
                                                type="number"
                                                placeholder="Pin Code"
                                                required
                                                value={pinCode}
                                                onChange={(e) => setPinCode(e.target.value)}
                                          />
                                    </div>

                                    <div>
                                          <Phone />
                                          <input
                                                type="number"
                                                placeholder="Phone Number"
                                                required
                                                value={phoneNo}
                                                onChange={(e) => setPhoneNo(e.target.value)}
                                                size="10"
                                          />
                                    </div>

                                    <div>
                                          <TransferWithinAStation />

                                          <select
                                                required
                                                value={state}
                                                onChange={(e) => setState(e.target.value)}
                                          >
                                                <option value="">State</option>
                                                {State &&
                                                      State.map((item) => (
                                                            <option key={item.name} value={item.name}>
                                                                  {item.name}
                                                            </option>
                                                      ))}
                                          </select>
                                    </div>

                                    <input
                                          type="submit"
                                          value="Continue"
                                          className="shippingBtn"
                                          disabled={state ? false : true}
                                    />
                              </form>
                        </div>
                  </div>
            </>
      )
}

export default Shipping