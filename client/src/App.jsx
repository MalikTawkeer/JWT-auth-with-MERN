import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Secret from './pages/Secret'
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
  <BrowserRouter>
  <Routes>
    <Route
    path='/login'
    element={<Login />}
    />
    <Route
    path='/register'
    element={<Register />}
    />
    <Route
    path='/'
    element={<Secret />}
    />
  </Routes>
  </BrowserRouter>
  )
}

export default App