import React, { useEffect } from 'react';
import "./MyOrders.css"
import { useDispatch, useSelector } from "react-redux";
import { getMyOrders, clearError } from '../../redux/actions/orderAction';
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import { Typography } from '@mui/material';
import Loader from "../layout/Loader/Loader"
import MetaData from "../layout/MetaData";
import { Launch } from "@mui/icons-material"
import { Link } from "react-router-dom";

const MyOrders = () => {

      const { user } = useSelector(state => state.user)
      const { orders, loading, error } = useSelector(state => state.myOrders);
      const dispatch = useDispatch();
      const alert = useAlert();

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError())
            }
            dispatch(getMyOrders())
      }, [dispatch, error, alert]);

      const columns = [
            { field: "id", headerName: "Order ID", minWidth: 300, flex: 1 },

            {
                  field: "status",
                  headerName: "Status",
                  minWidth: 150,
                  flex: 0.5,
                  cellClassName: (params) => {
                        return params.getValue(params.id, "status") === "Delivered"
                              ? "greenColor"
                              : "redColor";
                  },
            },
            {
                  field: "itemsQty",
                  headerName: "Items Qty",
                  type: "number",
                  minWidth: 150,
                  flex: 0.3,
            },

            {
                  field: "amount",
                  headerName: "Amount",
                  type: "number",
                  minWidth: 270,
                  flex: 0.5,
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
                              <Link to={`/order/${params.getValue(params.id, "id")}`}>
                                    <Launch />
                              </Link>
                        );
                  },
            },
      ];
      const rows = [];

      orders &&
            orders.forEach((item, index) => {
                  rows.push({
                        itemsQty: item.orderItems.length,
                        id: item._id,
                        status: item.orderStatus,
                        amount: item.totalPrice,
                  });
            });

      return (
            <>
                  {loading ? <Loader /> : (
                        <div className="myOrdersPage">
                              <MetaData title="My Orders" />
                              <DataGrid
                                    rows={rows}
                                    columns={columns}
                                    pageSize={10}
                                    rowsPerPageOptions={[10]}
                                    disableSelectionOnClick
                                    className='myOrdersTable'
                                    autoHeight
                              />
                              <Typography id="myOrdersHeading">{user.name}'s Orders</Typography>
                        </div>
                  )}
            </>
      )
}

export default MyOrders;