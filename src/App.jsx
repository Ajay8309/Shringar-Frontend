import React from 'react'
import { Suspense } from 'react'
import Spinner from "./components/Spinner/Spinner";
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login, Register, ProductList, ProductDetails, Cart, Wishlist} from './pages'
import Layout from './layout/layout';
// import ProtectedRoute from "./routes/protected.route"


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
      <Route path="/signup" element = {<Register/>}/>
      <Route index element={<ProductList />} />
      <Route path="/login" element = {<Login/>}/>
      <Route path="/products/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart />} />
      <Route path="/wishlist" element={<Wishlist />} />
    </Routes>
     
    </BrowserRouter>
  )
}

export default App