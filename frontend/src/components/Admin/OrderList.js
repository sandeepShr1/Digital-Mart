import React, { useEffect } from 'react';
import "./ProductList.css";
import { useDispatch, useSelector } from "react-redux";
import { getOrderList, clearError, deleteOrder } from "../../redux/actions/orderAction";
import { DELETE_ORDERS_RESET } from "../../redux/constants/orderConstants"
import { useAlert } from "react-alert";
import { DataGrid } from '@mui/x-data-grid';
import MetaData from "../layout/MetaData";
import { Link, useNavigate } from "react-router-dom";
import { Edit, Delete } from "@mui/icons-material"
import { Button } from '@mui/material';
import SideBar from "./Sidebar";


const OrderList = () => {
      const { orderList, error } = useSelector(state => state.orderList);
      const { error: deleteError, isDeleted } = useSelector(state => state.order);
      const dispatch = useDispatch();
      const alert = useAlert();
      const history = useNavigate()


      const deleteOrderHandler = (id) => {
            dispatch(deleteOrder(id));
      }

      useEffect(() => {
            if (error) {
                  alert.error(error);
                  dispatch(clearError());
            }
            if (deleteError) {
                  alert.error(deleteError);
                  dispatch(clearError());
            }
            if (isDeleted) {
                  console.log(isDeleted)
                  alert.success("Order Deleted Successfully");
                  history("/admin/orders");
                  dispatch({ type: DELETE_ORDERS_RESET });
            }

            dispatch(getOrderList());
      }, [dispatch, alert, error, deleteError, isDeleted, history]);

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
                              <>
                                    <Link to={`/admin/order/${params.getValue(params.id, "id")}`}>
                                          <Edit />
                                    </Link>

                                    <Button
                                          onClick={() => deleteOrderHandler(params.getValue(params.id, "id"))}
                                    >
                                          <Delete />
                                    </Button>
                              </>
                        );
                  },
            },
      ];

      const rows = [];

      orderList &&
            orderList.forEach((item) => {
                  rows.push({
                        itemsQty: item.orderItems.length,
                        id: item._id,
                        status: item.orderStatus,
                        amount: item.totalPrice,
                  });
            });

      return (
            <>
                  <MetaData title={`ALL Orders - Admin`} />

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

export default OrderList;