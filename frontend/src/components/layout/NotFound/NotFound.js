import React from 'react'
import "./NotFound.css"
import { Link } from "react-router-dom"
const NotFound = () => {
      return (
            <div className='page'>
                  <div className="pageNotFoundContainer">
                        <h2>404</h2>
                        <h3>Oops, nothing here...</h3>
                        <p>Please Check the URL</p>
                        <p>Otherwise, <Link to="/">Click here</Link> to redirect to homepage.</p>
                  </div>
            </div>
      )
}

export default NotFound