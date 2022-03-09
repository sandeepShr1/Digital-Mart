import React, { useEffect } from 'react';
import "./ProductList.css"
import { useDispatch, useSelector } from "react-redux"
import { getAllUsers, clearError, deleteUser } from '../../redux/actions/userActions';
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material"
import { Button } from '@mui/material';
import SideBar from "./Sidebar";
import { DELETE_USER_RESET } from '../../redux/constants/userConstants';

const Users = () => {
      const { users, error } = useSelector(state => state.users);
      const { isDeleted, error: deleteError } = useSelector(state => state.profile);
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate()

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (deleteError) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (isDeleted) {
                  alert.success("User Deleted successfully");
                  history("/admin/users");
                  dispatch({ type: DELETE_USER_RESET })
            }
            dispatch(getAllUsers())
      }, [dispatch, alert, error, deleteError, history, isDeleted]);

      const deleteUserHandler = (id) => {
            dispatch(deleteUser(id));
      }

      const columns = [
            { field: "id", headerName: "User ID", minWidth: 180, flex: 0.8 },

            {
                  field: "email",
                  headerName: "Email",
                  minWidth: 200,
                  flex: 1,
            },
            {
                  field: "name",
                  headerName: "Name",
                  minWidth: 150,
                  flex: 0.5,
            },

            {
                  field: "role",
                  headerName: "Role",
                  type: "number",
                  minWidth: 150,
                  flex: 0.3,
                  cellClassName: (params) => {
                        return params.getValue(params.id, "role") === "admin"
                              ? "greenColor"
                              : "redColor";
                  },
            },

            {
                  field: "actions",
                  flex: 0.3,
                  headerName: "Actions",
                  minWidth: 150,
                  type: "number",
                  sortable: false,
                  renderCell: (params) => {
                        return (
                              <>
                                    <Link to={`/admin/user/${params.getValue(params.id, "id")}`}>
                                          <Edit />
                                    </Link>

                                    <Button
                                          onClick={() =>
                                                deleteUserHandler(params.getValue(params.id, "id"))
                                          }
                                    >
                                          <Delete />
                                    </Button>
                              </>
                        );
                  },
            },
      ];

      const rows = [];

      users &&
            users.forEach((item) => {
                  rows.push({
                        id: item._id,
                        role: item.role,
                        email: item.email,
                        name: item.name,
                  });
            });

      return (
            <>
                  <MetaData title={`ALL Users - Admin`} />

                  <div className="dashboard">
                        <SideBar />
                        <div className="productListContainer">
                              <h1 id="productListHeading">ALL Orders</h1>

                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                    className="productListTable"
                                    autoHeight
                              />
                        </div>
                  </div>
            </>
      )
}

export default Users;