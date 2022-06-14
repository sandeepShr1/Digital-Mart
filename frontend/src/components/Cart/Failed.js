import React from 'react'
import "./Success.css"
import { CancelRounded } from "@mui/icons-material";
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Failed = () => {
      return (
            <div className='orderSuccess'>
                  < CancelRounded />
                  <Typography>Sorry! Your Order has been Failed. </Typography>
                  <Link to="/" >Return to Home</Link>
            </div>
      )
}

export default Failed