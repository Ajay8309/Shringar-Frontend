import React from 'react'
import {useState} from 'react'
import {useCart} from "../../context/CartContext"
import {useUser} from "../../context/UserContext"
import {useWishlist} from "../../context/WishlistContext"
import {LogOut, ShoppingCart, User, Heart} from "react-feather"
import { Link } from 'react-router-dom'
import {Badge, Button, Dropdown, DropdownItem, Transition} from "@windmill/react-ui"
import './Nav.css'
import { FaSearch, FaShoppingCart} from 'react-icons/fa';
import Spinner from '../Spinner/Spinner'



const Nav = () => {
  const {cartTotal} = useCart();
  const {wishlistTotal} = useWishlist();
  const {isLoggedIn, userData, logout} = useUser(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <nav className='nav'>

      <Link to="/" className='Logo'>
       <h1>
          Shringar
        </h1>
      </Link>
      
      <div className="searchBox">
      <form  className='searchBox'> 
      {/* Search logic is remaining  */}
          <input
            type='text'
            className='searchInput'
            placeholder='Search for products'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button className='search'>
          <FaSearch className='searchBtn'/>
        </button>
      </div>

      <ul className='links'>
        {!isLoggedIn && (
          <>
          <li className='logLink'>
            <Link to="/login" className='loginLink'>
              <span>Login</span>
            </Link>
          </li>
          <li className='cartLink'>
            <Link to="/cart">
              <button className='cartBtn'>
                <ShoppingCart className='cartImg'/>
                <div className="cartTotal">
                  {cartTotal}
                </div>{" "}
              </button>
            </Link>
          </li>
          </>
        )}

        {isLoggedIn && (
          <>
          <li className='wishlistLink'>
               <Link to="/wishlist">
                  <button className='wishlistBtn'>
                    <span>Wishlist</span>
                    <Heart className='heartImg'/>
                    <div className="wishlistTotal">
                      {wishlistTotal}
                    </div>
                  </button>
               </Link>
          </li>
           <li className='cartLink'>
           <Link to="/cart">
              <button className='cartBtn'>
                <span>Cart</span>
                <ShoppingCart className='cartImg'/>
                <div className="cartTotal">
                  {cartTotal}
                </div>{" "}
              </button>
            </Link>
           </li>
           <li className='AccountLink'>
            <button
              className='AccountBtn'
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              // onMouseOver={() => setIsDropdownOpen(true)}
            >
              <span className='AccountText'>Account</span>
              <User className='userImg'/>
            </button>
            {isDropdownOpen && (
              <div className='AccountBox'>
                <div className="name">
                  <p>{userData?.fullname?.split(" ").join(" ")}</p>
                  <p>@{userData?.username}</p>
                </div>
                <div className="profile">
                  <Link to="/profile">
                    profile
                  </Link>
                </div>
                <div className='orders'>
                  <Link to="/orders">
                    Orders
                  </Link>
                </div>
                <div className="logout">
                  <Link to="/login" onClick={() => logout()}>
                    Logout
                  </Link>
                </div>
              </div>
            )}
            
           </li>
          </>
        )}
      </ul>
    
    </nav>
  )
}

export default Nav