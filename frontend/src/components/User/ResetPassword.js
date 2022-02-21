import React, { useState, useEffect } from 'react';
import "./ResetPassword.css";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, resetPassword } from "../../redux/actions/userActions";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader/Loader";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import MetaData from "../layout/MetaData";

const ResetPassword = () => {

      const { loading, error, success } = useSelector((state) => state.resetPassword)
      const dispatch = useDispatch();
      const history = useNavigate();
      const alert = useAlert();
      const { token } = useParams();

      const [password, setPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");


      const resetPasswordSubmit = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("password", password);
            myForm.set("confirmPassword", confirmPassword);
            dispatch(resetPassword(token, myForm))
      }

      useEffect(() => {

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (success) {
                  alert.success("Password reset successfully")
                  history("/login");

            }
      }, [dispatch, error, alert, history, success]);


      return (
            <>
                  {
                        loading ? <Loader /> : (
                              <>
                                    <MetaData title="Change Password" />
                                    <div className="resetPasswordContainer">
                                          <div className="resetPasswordBox">
                                                <h2 className="resetPasswordHeading">Update Profile</h2>

                                                <form
                                                      className="resetPasswordForm"
                                                      onSubmit={resetPasswordSubmit}
                                                >
                                                      <div>
                                                            <LockOpenIcon />
                                                            <input
                                                                  type="password"
                                                                  placeholder="New Password"
                                                                  required
                                                                  value={password}
                                                                  onChange={(e) => setPassword(e.target.value)}
                                                            />
                                                      </div>
                                                      <div className="loginPassword">
                                                            <LockIcon />
                                                            <input
                                                                  type="password"
                                                                  placeholder="Confirm Password"
                                                                  required
                                                                  value={confirmPassword}
                                                                  onChange={(e) => setConfirmPassword(e.target.value)}
                                                            />
                                                      </div>
                                                      <input
                                                            type="submit"
                                                            value="Update"
                                                            className="resetPasswordBtn"
                                                      />
                                                </form>
                                          </div>
                                    </div>
                              </>
                        )
                  }
            </>
      )
}

export default ResetPassword