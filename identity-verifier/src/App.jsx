import React from 'react'
import { Route, Router, Routes } from 'react-router'
import Home from './Pages/Home'
import RegisterUser from './Pages/RegisterUser'
import RegisterVerifier from './Pages/RegisterVerifier'
import LoginUser from './Pages/LoginUser'
import LoginVerifier from './Pages/LoginVerifier'
import UserdashBoard from './Pages/UserdashBoard'
import VerifierDashboard from './Pages/VerifierdashBoard'
import Navbar from './Pages/Navbar'
import About from './Pages/About'
import Features from './Pages/Features'


const App = () => {
  return (
    <>
    <Navbar />
    <Routes>
      <Route path= '/' element={<Home />} />
      <Route path = '/about' element = {<About />} />
      <Route path = '/features' element = {<Features />} />

      <Route path='/register-user' element={<RegisterUser />} />  
      <Route path= '/register-verifier' element={<RegisterVerifier />} />
      <Route path = '/user-login' element= {<LoginUser />} />
      <Route path= '/verifier-login' element = {<LoginVerifier />} />

      <Route path = '/user-dashboard' element={<UserdashBoard />} />
      <Route path = '/verifier-dashboard' element = {<VerifierDashboard />} />
    </Routes>


    </>
    
  )
}

export default App
