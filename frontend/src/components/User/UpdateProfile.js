import React, { useState, useEffect } from 'react';
import "./UpdateProfile.css";
import { useNavigate } from "react-router-dom";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import FaceIcon from "@mui/icons-material/Face";
import { useDispatch, useSelector } from "react-redux";
import { clearError, loadUser, updateProfile } from "../../redux/actions/userActions";
import { useAlert } from "react-alert"
import Loader from "../layout/Loader/Loader"
import { UPDATE_PROFILE_RESET } from '../../redux/constants/userConstants';
import MetaData from "../layout/MetaData";

const UpdateProfile = () => {
      const { user } = useSelector(state => state.user);
      const { loading, error, isUpdated } = useSelector((state) => state.profile)
      const dispatch = useDispatch();
      const history = useNavigate();
      const alert = useAlert();

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [avatar, setAvatar] = useState("/Profile.png");
      const [avatarPreview, setAvatarPreview] = useState("/Profile.png");

      const updateProfileSubmit = (e) => {
            e.preventDefault();

            const myForm = new FormData();
            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("avatar", avatar);
            dispatch(updateProfile(myForm))
      }

      const updateProfileDataChange = (e) => {
            if (e.target.name === "avatar") {
                  const reader = new FileReader();

                  reader.onload = () => {
                        if (reader.readyState === 2) {
                              setAvatarPreview(reader.result);
                              setAvatar(reader.result);
                        }
                  };

                  reader.readAsDataURL(e.target.files[0]);
            }
      };


      useEffect(() => {

            if (user) {
                  setName(user.name);
                  setEmail(user.email);
                  setAvatarPreview(user.avatar.url);
            }

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (isUpdated) {
                  alert.success("Profile update successfully")
                  dispatch(loadUser());
                  history("/account");

                  dispatch({
                        type: UPDATE_PROFILE_RESET,

                  })
            }
      }, [dispatch, error, alert, history, user, isUpdated]);

      return (
            <>
                  {loading ? <Loader /> : (
                        <>
                              <MetaData title="Update Profile" />
                              <div className="updateProfileContainer">
                                    <div className="updateProfileBox">
                                          <h2 className="updateProfileHeading">Update Profile</h2>
                                          <form
                                                className="updateProfileForm"
                                                encType="multipart/form-data"

                                          >
                                                <div className="updateProfile">
                                                      <FaceIcon />
                                                      <input
                                                            type="text"
                                                            placeholder="Name"
                                                            required
                                                            name="name"
                                                            value={name}
                                                            onChange={(e) => setName(e.target.value)}
                                                      />
                                                </div>
                                                <div className="updateProfileEmail">
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

                                                <div id="updateProfileImage">
                                                      <img src={avatarPreview} alt="Avatar Preview" />
                                                      <input
                                                            type="file"
                                                            name="avatar"
                                                            accept="image/*"
                                                            onChange={updateProfileDataChange}
                                                      />
                                                </div>
                                                <input type="submit" onClick={updateProfileSubmit} value="Update" className="updateProfileBtn" />
                                          </form>
                                    </div>

                              </div>
                        </>
                  )}
            </>
      )
}

export default UpdateProfile