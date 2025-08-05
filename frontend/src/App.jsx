import { useState } from 'react'
import {Routes,Route, BrowserRouter} from 'react-router-dom'
import Home from './Pages/Home/Home'
import Login from './Pages/Auth/Login/Login'
import Register from './Pages/Auth/Register/Register'
import Profile from './Pages/Profile/Profile'



function App() {


  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/login' element = {<Login/>} />
      <Route path='/register' element = {<Register/>} /> 
      <Route path='/profile/:id' element = {<Profile/>} />  
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
