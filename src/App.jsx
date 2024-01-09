import React from 'react'
import { Suspense } from 'react'
import Spinner from "./components/Spinner/Spinner";
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login, Register, ProductList} from './pages'
import Layout from './layout/layout';

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
      <Route path='/' element={<ProductList />} />
      <Route path="/login" element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App