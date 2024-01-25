import React from 'react'
import {useState, useEffect} from 'react'
import {useCart} from "../../context/CartContext"
import {useUser} from "../../context/UserContext"
import {useWishlist} from "../../context/WishlistContext"
import {LogOut, ShoppingCart, User, Heart} from "react-feather"
import { Link } from 'react-router-dom'
import './Nav.css'
import { FaSearch} from 'react-icons/fa';
import Spinner from '../Spinner/Spinner';
import { Filter } from 'react-feather';
import FilterWindow from '../FilterWindow'
import { useFilter } from '../../context/FilterContext'
import { useProduct } from '../../context/ProductContext'
// import { useHistory } from 'react-router-dom';
// import {ProductService} from "../../services/product.service"


const Nav = () => {
  const {cartTotal} = useCart();
  const {wishlistTotal} = useWishlist();
  const {isLoggedIn, userData, logout} = useUser(); 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isThirdNavFixed, setIsThirdNavFixed] = useState(false);
  const [isFilterWindowOpen, setIsFilterWindowOpen] = useState(false); 

  

  const {setPage, updateFilters, getProductsByName, getProductByCategory,
     getProductsByMaterial} = useProduct();


  const handleScroll = () => {
    if (window.scrollY > 120) {
      setIsThirdNavFixed(true);
    } else {
      setIsThirdNavFixed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleFilterWindow = () => {
    setIsFilterWindowOpen(!isFilterWindowOpen);
  };
  
  const applyFilters = (filters) => {
    console.log('Applying filters:', filters);
    updateFilters(filters);
    setPage(1);
    toggleFilterWindow();
  };

  const handleSearch = () => {
    updateFilters({});
    setPage(1);
    getProductsByName(searchQuery);
  };
  


  return (
    <nav className='nav'>
       <div className="upperNav">

      <Link to="/" className='Logo'>
       <h1>
          Shringar
        </h1>
      </Link>
      
      <div className="searchBox">
      <form  className='searchBox' onSubmit={(e) => e.preventDefault()}> 
      {/* Search logic is remaining  */}
          <input
            type='text'
            className='searchInput'
            placeholder='Search for products'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        <button className='search' onClick={handleSearch}>
          <FaSearch className='searchBtn'/>
        </button>
      </div>

      <ul className='links'>
        {!isLoggedIn && (
          <>
          <li className='logLink'>
            <Link to="/login" className='loginLink underline'>
              <span>Login</span>
            </Link>
          </li>
          <li className='cartLink'>
            <Link to="/cart" className='underline'>
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
               <Link to="/wishlist" className='underline'>
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
           <Link to="/cart" className='underline'>
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
                  <Link to="/profile" className='underline'>
                    profile
                  </Link>
                </div>
                <div className='orders'>
                  <Link to="/orders" className='underline'>
                    Orders
                  </Link>
                </div>
                <div className="logout">
                  <Link to="/login" onClick={() => logout()} className='underline'>
                    Logout
                  </Link>
                </div>
              </div>
            )}
            
           </li>
          </>
        )}
      </ul>
       </div>

       <div className="lowerNav ">
        <ul className="lowerNavLinks">
          <li className="link" >All Jewellery</li>
          <li className="link" onClick={() => {getProductsByMaterial('gold')}}>Gold</li>
          <li className="link" onClick={() => {getProductByCategory('Rings')}}>Rings</li>
          <li className="link">Braclet</li>
        </ul>
       </div>

       <div className={`thirNav`}>
         <p>Home | All Jewellery</p> 
          <p>Gold Festival</p>
      </div>

      <div className={`fourthNav ${isThirdNavFixed ? 'fixed' : ''}`}>
        <Filter size={27} className='filterIcon' onClick={toggleFilterWindow} />
      </div>

    
      {isFilterWindowOpen && <FilterWindow onClose={toggleFilterWindow}
       isFilterWindowOpen={isFilterWindowOpen} 
       onApply={applyFilters}
       />}
    
    </nav>
  )
}

export default Nav