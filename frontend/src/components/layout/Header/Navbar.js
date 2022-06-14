import React, { useState } from 'react';
import "./Navbar.css"
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonIcon from '@mui/icons-material/Person';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { useSelector } from 'react-redux';


const Navbar = () => {
      const [keyword, setKeyword] = useState("");
      const [open, setOpen] = useState(false);
      const history = useNavigate();
      const { cartItems } = useSelector(state => state.cart);

      const searchSubmitHandler = (e) => {
            e.preventDefault();
            if (keyword.trim()) {
                  history(`/products/${keyword}`)
            }
            else {
                  history("/products")
            }
      }
      const handleClick = () => {
            setOpen(!open);
      };

      const closeMenu = () => {
            setOpen(false);
      };
      return (
            <div className="header">
                  <div className="container">

                        <div className="navbar">
                              <p className="logo">
                                    <Link to="/">DIGITAL MART</Link>
                              </p>
                              <div onClick={handleClick} className="nav-icon">
                                    {open ? <CloseIcon /> : <MenuIcon />}
                              </div>
                              <div className={open ? 'nav-links active' : 'nav-links'}>
                                    <div className='nav'>
                                          <ul >
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/">Home</NavLink> </li>
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/products">Products</NavLink> </li>
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/about">About</NavLink> </li>

                                          </ul>
                                    </div>
                                    <div className="ic">
                                          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/login" ><PersonIcon /></NavLink>
                                          <NavLink className={({ isActive }) => (isActive ? 'active cart-icon' : 'inactive cart-icon')} onClick={closeMenu} to="/cart" ><ShoppingCartIcon />
                                                <span className='cart-item-qty'>
                                                      {cartItems && cartItems.length}
                                                </span>
                                          </NavLink>
                                    </div>
                              </div>
                        </div>
                        <div className="search-container">
                              <div className="wrap">
                                    <form className='search' onSubmit={searchSubmitHandler} >
                                          <input type="text" className='searchTerm'
                                                placeholder='Search for a product'
                                                onChange={(e) => setKeyword(e.target.value)}
                                          />
                                          <button type="submit" onClick={closeMenu} className="searchButton">
                                                <SearchIcon />
                                          </button>
                                    </form>
                              </div>
                        </div>
                  </div >
            </div >
      )
}

export default Navbar