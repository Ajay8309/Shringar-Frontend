import React, { Profiler } from 'react'
import { Suspense } from 'react'
import Spinner from "./components/Spinner/Spinner";
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login, Register, ProductList, ProductDetails, Cart, Wishlist, Profile, Checkout} from './pages'
import Layout from './layout/layout';
import ProtectedRoute from "./routes/protected.route"


const App = () => {
  return (
    <BrowserRouter>
     <Suspense
        fallback={    
          <Layout>
            <Spinner size={100} />
          </Layout>
        }
      ></Suspense>
     <Toaster position="top-right" />
      
    <Routes>

      {/* <ProtectedRoute> */}
      <Route path="/signup" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
      {/* </ProtectedRoute> */}
      <Route index element={<ProductList />} />
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/profile" element = {<Profile/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App