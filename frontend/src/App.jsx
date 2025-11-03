import React from 'react'
import home from "./components/home.jsx"
import Login from "./components/Login.jsx"
import Signup from "./components/Signup.jsx"
import { Routes, Route } from 'react-router-dom'
import PageNotFound from './components/PageNotFound.jsx'
import { Toaster } from 'react-hot-toast';
import { Navigate } from 'react-router-dom'

function App() {

  const token = localStorage.getItem("jwt")
  return (
    <div >
      <Routes>
        <Route path="/" element ={token?<home/> : <Navigate to  ={"/login"} />} />
        <Route path="/Login" element ={<Login/>} />
        <Route path="/signup" element ={<Signup/>} />
        <Route path="*" element ={<PageNotFound/>} />
      </Routes>
      <Toaster />
      
    </div>
  )
}

export default App
