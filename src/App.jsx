import React from 'react'
import { Suspense } from 'react'
import Spinner from "./components/Spinner";
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Login, Register} from './pages'

const App = () => {
  return (
    <BrowserRouter>
     <Suspense
        fallback={    
            <Spinner size={100} />
        }
      ></Suspense>
     <Toaster position="top-right" />
    <Routes>
      {/* <Route index element={<ProductList />} /> */}
      <Route path="/signup" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App