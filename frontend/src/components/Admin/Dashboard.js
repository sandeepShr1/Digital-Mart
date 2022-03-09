import React, { useEffect } from 'react';
import "./Dashboard.css"
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography'
import Chart from 'chart.js/auto'
import { Doughnut, Line } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { getAdminProducts } from "../../redux/actions/productActions"
import { getOrderList } from "../../redux/actions/orderAction";
import { getAllUsers } from "../../redux/actions/userActions"

const Dashboard = () => {
      const { products } = useSelector(state => state.products);
      const { orderList } = useSelector(state => state.orderList);
      const { users } = useSelector(state => state.users);
      const dispatch = useDispatch()
      useEffect(() => {
            dispatch(getAdminProducts())
            dispatch(getOrderList())
            dispatch(getAllUsers())
      }, [dispatch]);

      let totalAmount = 0;
      orderList && orderList.forEach((item) => totalAmount += item.totalPrice)

      let outOfStock = 0;
      products && products.forEach((item) => {
            if (item.stock === 0) {
                  outOfStock += 1;
            }
      })

      const lineState = {
            labels: ["Initial Amount", "Amount Earned"],
            datasets: [
                  {
                        label: "TOTAL AMOUNT",
                        backgroundColor: ["tomato"],
                        hoverBackgroundColor: ["rgb(197, 72, 49)"],
                        data: [0, totalAmount],
                  },
            ],
      };

      const doughnutState = {
            labels: ["Out of Stock", "InStock"],
            datasets: [
                  {
                        backgroundColor: ["#00A6B4", "#6800B4"],
                        hoverBackgroundColor: ["#4B5000", "#35014F"],
                        data: [outOfStock, products.length - outOfStock],
                  },
            ],
      };


      return (
            <div className='dashboard'>
                  <Sidebar />

                  <div className='dashboardContainer'>
                        <Typography variant='h1'>Dashboard</Typography>
                        <div className="dashboardSummary">
                              <div>
                                    <p>Total Amount : रू {totalAmount}</p>
                              </div>
                              <div className="dashboardSummaryBox2">
                                    <Link to="/admin/products" >
                                          <p>Products</p>
                                          <p>{products && products.length}</p>
                                    </Link>
                                    <Link to="/admin/users" >
                                          <p>Users</p>
                                          <p>{users && users.length}</p>
                                    </Link>
                                    <Link to="/admin/orders" >
                                          <p>Orders</p>
                                          <p>{orderList && orderList.length}</p>
                                    </Link>
                              </div>
                        </div>

                        <div className="lineChart">
                              <Line data={lineState} />
                        </div>
                        <div className="doughnutChart">
                              <Doughnut data={doughnutState} />
                        </div>
                  </div>
            </div>
      )
}

export default Dashboard