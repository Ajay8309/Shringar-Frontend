import React from 'react'
import {useState, useEffect} from 'react'
import {useCart} from "../../context/CartContext"
import {useUser} from "../../context/UserContext"
import {useWishlist} from "../../context/WishlistContext"
import {LogOut, ShoppingCart, User, Heart} from "react-feather"
import { Link, useNavigate } from 'react-router-dom'
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
  const [activeLink, setActiveLink] = useState(null);
  const [page, setPagec] = useState('');
  const [showMenu, setShowMenu] = useState(false);

  const navigate = useNavigate();




  

  const {setPage, updateFilters, getProductsByName, getProductByCategory, getProductByMaterial} = useProduct();


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
    // updateFilters({});
    setPage(1);
    console.log(searchQuery);
    getProductsByName(searchQuery);
  };

  const handleMaterial = (name) => {
    setPage(1);
    console.log("Inside handleMaterial")
    updateFilters({materialType:"gold"});
    setActiveLink(name);
    setPagec(name);
  }

  const handleCategory = (name) => {
    console.log("category hu mai tum kyaa ho");
    setPage(1);
    updateFilters({categoryName:name});
    // getProductByCategory(name);
    setActiveLink(name);
    setPagec(name);
  }
  

  const handleMouseEnter = () => {
    setShowMenu(true);
    console.log("inside menu");
  };

  const handleMouseLeave = () => {
    setShowMenu(false);
    console.log("ouside");
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
    >
        <span className='AccountText'>Account</span>
        <User className='userImg'/>
    </button>
    <div className={`AccountBox ${isDropdownOpen ? 'open' : ''}`}>
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
                  <Link to="/order" className='underline'>
                    Orders
                  </Link>
                </div>
                <div className="logout">
                  <Link to="/login" onClick={() => logout()} className='underline'>
                    Logout
                  </Link>
                </div>
    </div>
   </li>

            
          </>
        )}
      </ul>
       </div>

       <div className="lowerNav ">
       <ul className="lowerNavLinks">
        {/* <Link to="/products"> */}
       <li
        className="link"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // onClick={navigate('/products')}
        >
        All Jewellery
        {showMenu && (
          <div className="menu">
            <div className="menuContainer">
            <ul>
              <li><h2 className='MenuTitle1'>Categories</h2></li>
              <li>Rings</li>
              <li>Bracelets</li>
              <li>Necklaces</li>
              <li>Pendants</li>
              <li>Finger Rings</li>
              <li>Mangalsutra</li>
              <li>Chains</li>
              <li>Jhumkaas</li>             
            </ul>
         
            <ul>
            <li><h2 className='MenuTitle1'>Gold Coins</h2></li>
              <li>1 gram</li>
              <li>2 gram</li>
              <li>3 gram</li>
              <li>4 gram</li>
              <li>5 gram</li>
              <li>8 gram</li>
              <li>10 gram</li>
              <li>25 gram</li>
              <li>30 gram</li>
              <li>50 gram</li>
              <li>100 gram</li>
            </ul>

            <ul>
              <li><h2 className='MenuTitle1'>Price</h2></li>
              <li> &lt; 25K</li>
              <li>25K - 50K</li>
              <li>50K - 1L</li>
              <li>1L and Above</li>         
            </ul>

            <ul>
              <li><h2 className='MenuTitle1'>Metal</h2></li>
              <li>Gold</li>
              <li>Silver</li>           
            </ul>
            </div>
          </div>
        )}
      </li>
        {/* </Link> */}
      <Link to="/products" className='directLinks'>
      <li className={`link ${activeLink === 'gold' ? 'active' : ''}`} onClick={() => handleMaterial('gold')}>Gold</li>
      </Link>
      <Link to="/products" className='directLinks'>
      <li className={`link ${activeLink === 'Rings' ? 'active' : ''}`} onClick={() => handleCategory('Rings')}>Rings</li>
      </Link>
      <Link to="/products" className='directLinks'>
      <li className={`link ${activeLink === 'Bracelets' ? 'active' : ''}`} onClick={() => handleCategory('Bracelets')}>Bracelets</li>
      </Link>
      <Link to="/products" className='directLinks'>
      <li className={`link ${activeLink === 'Necklaces' ? 'active' : ''}`} onClick={() => handleCategory('Necklaces')}>Necklaces</li>
      </Link>
    </ul>
       </div>

       {page == '' ? (
       <div className={`thirNav`}>
         <p>Home | All Jewellery</p> 
          <p>Gold Festival</p>
      </div>
       ) : (
        <div className={`thirNav`}>
        <p>Home | {page}</p> 
         <p>Gold Festival</p>
        </div>
       )}

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