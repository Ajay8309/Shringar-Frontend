import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import {ProductProvider} from "./context/ProductContext.jsx"
import {WishlistProvider} from "./context/WishlistContext.jsx"
import {ReviewProvider} from "./context/ReviewContext.jsx"
import {HelmetProvider} from "react-helmet-async"
import {FilterProvider} from "./context/FilterContext.jsx"

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
            <HelmetProvider>
    <UserProvider>
      <ProductProvider>
       <ReviewProvider>
        <CartProvider>
          <WishlistProvider>
            <FilterProvider>
             <App />
            </FilterProvider>
          </WishlistProvider>
        </CartProvider>
       </ReviewProvider>
      </ProductProvider>
    </UserProvider>
            </HelmetProvider>
  </React.StrictMode>,
)
