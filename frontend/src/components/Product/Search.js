import React, { useState } from 'react';
import "./Search.css";
import { useNavigate } from 'react-router-dom';

const Search = () => {
      const [keyword, setKeyword] = useState("");
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
      return (
            <>
                  <form className='searchBox' onSubmit={searchSubmitHandler}>
                        <input type="text"
                              placeholder='Search for a product'
                              onChange={(e) => setKeyword(e.target.value)}
                        />
                        <input type="submit" value="Search" />
                  </form>
            </>
      )
}

export default Search;