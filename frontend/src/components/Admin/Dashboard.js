import React from 'react';
import "./Dashboard.css"
import Sidebar from "./Sidebar";
import { Link } from "react-router-dom";
import Typography from '@mui/material/Typography'

const Dashboard = () => {
      return (
            <div className='dashboard'>
                  <Sidebar />

                  <div className='dashboardContainer'>
                        <Typography variant='h1'>Dashboard</Typography>
                        <div className="dashboardSummary">
                              <div>
                                    <p>Total Amount : 40000</p>
                              </div>
                              <div className="dashboardSummaryBox2">
                                    <Link to="#" >product 40</Link>
                                    <Link to="#" >product 40</Link>
                                    <Link to="#" >product 40</Link>
                              </div>
                        </div>
                  </div>
            </div>
      )
}

export default Dashboard