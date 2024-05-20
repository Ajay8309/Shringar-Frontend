import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from './context/UserContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import {ProductProvider} from "./context/ProductContext.jsx"
import {WishlistProvider} from "./context/WishlistContext.jsx"
import {ReviewProvider} from "./context/ReviewContext.jsx"
import {HelmetProvider} from "react-helmet-async"
import {FilterProvider} from "./context/FilterContext.jsx"
import {OrderProvider} from "./context/OrderContext.jsx"


const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
            <HelmetProvider>
              <OrderProvider>
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
              </OrderProvider>
            </HelmetProvider>
      </GoogleOAuthProvider> 
  </React.StrictMode>,
)
