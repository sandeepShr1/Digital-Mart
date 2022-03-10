import React from 'react'
import "./NotFound.css"
import { Link } from "react-router-dom"
import { Typography } from '@mui/material';
import { Error } from "@mui/icons-material"

const NotFound = () => {
      return (
            <div className="PageNotFound">
                  <Error />

                  <Typography>Page Not Found </Typography>
                  <Link to="/">Return Home</Link>
            </div>
      )
}

export default NotFound