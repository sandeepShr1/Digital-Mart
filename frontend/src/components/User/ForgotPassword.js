import React, { useState, useEffect } from 'react';
import "./ForgotPassword.css";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useDispatch, useSelector } from "react-redux";
import { clearError, forgotPassword } from "../../redux/actions/userActions";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData";
const ForgotPassword = () => {

      const { loading, error, message } = useSelector((state) => state.forgotPassword)
      const dispatch = useDispatch();
      const alert = useAlert();

      const [email, setEmail] = useState("");

      const forgotPasswordSubmit = (e) => {
            e.preventDefault();
            const myForm = new FormData();
            myForm.set("email", email);
            dispatch(forgotPassword(myForm));
      }

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (message) {
                  alert.success(message);
            }
      }, [dispatch, error, alert, message]);

      return (
            <>
                  {loading ? <Loader /> : (
                        <>
                              <MetaData title="Forgot Password" />
                              <div className="forgotPasswordContainer">
                                    <div className="forgotPasswordBox">
                                          <h2 className="forgotPasswordHeading">Forgot Password</h2>
                                          <form
                                                className="forgotPasswordForm"
                                                encType="multipart/form-data"
                                                onSubmit={forgotPasswordSubmit}
                                          >
                                                <div className="forgotPasswordEmail">
                                                      <MailOutlineIcon />
                                                      <input
                                                            type="email"
                                                            placeholder="Email"
                                                            required
                                                            name="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(e.target.value)}
                                                      />
                                                </div>

                                                <input type="submit" value="Submit" className="forgotPasswordBtn" />
                                          </form>
                                    </div>

                              </div>
                        </>
                  )}
            </>
      )
}

export default ForgotPassword