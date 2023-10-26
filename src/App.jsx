import React from 'react'
import { Suspense } from 'react'
import {Toaster} from "react-hot-toast"
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Login from './pages/login/login'
import Register from './pages/Register/signup'
const App = () => {
  return (
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element = {<Register/>}/>
      <Route path="/login" element = {<Login/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App