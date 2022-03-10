import React, { useState } from 'react';
import "./Navbar.css"
import { NavLink, Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import logo from '../../../images/logo.png'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SearchIcon from '@mui/icons-material/Search';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';


const Navbar = () => {
      const [keyword, setKeyword] = useState("");
      const [open, setOpen] = useState(false);
      const history = useNavigate();

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
                              <div className="logo">
                                    <Link to="/"><img src={logo} alt="Digital Mart" width={225} /></Link>
                              </div>
                              <div onClick={handleClick} className="nav-icon">
                                    {open ? <CloseIcon /> : <MenuIcon />}
                              </div>
                              <div className={open ? 'nav-links active' : 'nav-links'}>
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
                                    <div className='nav'>
                                          <ul >
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/">Home</NavLink> </li>
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/products">Products</NavLink> </li>
                                                <li> <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/about">About</NavLink> </li>

                                          </ul>
                                    </div>
                                    <div className="ic">
                                          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/login" ><AccountCircleIcon /></NavLink>
                                          <NavLink className={({ isActive }) => (isActive ? 'active' : 'inactive')} onClick={closeMenu} to="/cart" ><AddShoppingCartIcon /></NavLink>
                                    </div>
                              </div>
                        </div>
                  </div >
            </div >
      )
}

export default Navbar