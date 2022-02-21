import React, { useState, useEffect } from 'react';
import "./UpdatePassword.css";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { clearError, updatePassword } from "../../redux/actions/userActions";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader/Loader";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import { UPDATE_PASSWORD_RESET } from '../../redux/constants/userConstants';
import MetaData from "../layout/MetaData";

const UpdatePassword = () => {
      const { loading, error, isUpdated } = useSelector((state) => state.profile)
      const dispatch = useDispatch();
      const history = useNavigate();
      const alert = useAlert();

      const [oldPassword, setOldPassword] = useState("");
      const [newPassword, setNewPassword] = useState("");
      const [confirmPassword, setConfirmPassword] = useState("");


      const updatePasswordSubmit = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("oldPassword", oldPassword);
            myForm.set("newPassword", newPassword);
            myForm.set("confirmPassword", confirmPassword);
            dispatch(updatePassword(myForm))
      }



      useEffect(() => {

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (isUpdated) {
                  alert.success("Password update successfully")
                  history("/account");

                  dispatch({
                        type: UPDATE_PASSWORD_RESET,

                  })
            }
      }, [dispatch, error, alert, history, isUpdated]);
      return (
            <>
                  {loading ? (
                        <Loader />
                  ) : (
                        <>
                              <MetaData title="Change Password" />
                              <div className="updatePasswordContainer">
                                    <div className="updatePasswordBox">
                                          <h2 className="updatePasswordHeading">Change Password</h2>

                                          <form
                                                className="updatePasswordForm"
                                                onSubmit={updatePasswordSubmit}
                                          >
                                                <div className="loginPassword">
                                                      <VpnKeyIcon />
                                                      <input
                                                            type="password"
                                                            placeholder="Old Password"
                                                            required
                                                            value={oldPassword}
                                                            onChange={(e) => setOldPassword(e.target.value)}
                                                      />
                                                </div>

                                                <div className="loginPassword">
                                                      <LockOpenIcon />
                                                      <input
                                                            type="password"
                                                            placeholder="New Password"
                                                            required
                                                            value={newPassword}
                                                            onChange={(e) => setNewPassword(e.target.value)}
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
                                                      value="Change"
                                                      className="updatePasswordBtn"
                                                />
                                          </form>
                                    </div>
                              </div>
                        </>
                  )}
            </>
      )
}

export default UpdatePassword