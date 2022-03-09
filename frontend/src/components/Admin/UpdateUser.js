import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { clearError, getUser, updateUser } from "../../redux/actions/userActions";
import Sidebar from "./Sidebar";
import { Button } from '@mui/material';
import {
      VerifiedUser, Person, MailOutline
} from '@mui/icons-material';
import MetaData from "../layout/MetaData";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../layout/Loader/Loader"
import { EDIT_USER_RESET } from '../../redux/constants/userConstants';


const UpdateUser = () => {
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate();
      const { id } = useParams();

      const { loading, error, isUpdated, user } = useSelector((state) => state.userDetails);

      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [role, setRole] = useState("");


      useEffect(() => {
            if (user && user._id !== id) {
                  dispatch(getUser(id));
            } else {
                  setName(user.name);
                  setEmail(user.email);
                  setRole(user.role);
            }

            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }

            if (isUpdated) {
                  alert.success("User Updated Successfully");
                  history("/admin/users");
                  dispatch({ type: EDIT_USER_RESET });
            }
      }, [dispatch, alert, error, history, isUpdated, id, user]);

      const updateUserSubmitHandler = (e) => {
            e.preventDefault();

            const myForm = new FormData();

            myForm.set("name", name);
            myForm.set("email", email);
            myForm.set("role", role);

            dispatch(updateUser(id, myForm));

      };


      return (
            <>
                  {
                        loading ? <Loader /> : (
                              <>
                                    <MetaData title="update User" />
                                    <div className="dashboard">
                                          <Sidebar />
                                          <div className="newProductContainer">
                                                <form
                                                      className="createProductForm"
                                                      encType="multipart/form-data"
                                                      onSubmit={updateUserSubmitHandler}
                                                >
                                                      <h1>update Product</h1>

                                                      <div>
                                                            <Person />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Name"
                                                                  required
                                                                  value={name}
                                                                  onChange={(e) => setName(e.target.value)}
                                                            />
                                                      </div>
                                                      <div>
                                                            <MailOutline />
                                                            <input
                                                                  type="text"
                                                                  placeholder="Email"
                                                                  required
                                                                  value={email}
                                                                  onChange={(e) => setEmail(e.target.value)}
                                                            />
                                                      </div>

                                                      <div>
                                                            <VerifiedUser />
                                                            <select value={role} onChange={(e) => setRole(e.target.value)}>
                                                                  <option value="">Choose Role</option>
                                                                  <option value="admin">Admin</option>
                                                                  <option value="user">User</option>
                                                            </select>
                                                      </div>

                                                      <Button
                                                            id="createProductBtn"
                                                            type="submit"
                                                            disabled={
                                                                  loading ? true : false || role === "" ? true : false
                                                            }
                                                      >
                                                            Update
                                                      </Button>
                                                </form>
                                          </div>
                                    </div>
                              </>
                        )
                  }
            </>
      )
}


export default UpdateUser;