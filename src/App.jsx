import { Component, useState } from 'react'
import './App.css'
import Dashboard from './Components/Dashboard'
import Home from './frontend/Home'
import Admin from './Components/admin'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import AdminPrivateRoute from './AdminPrivateRoute'
import axios from 'axios'


axios.defaults.baseURL = 'http://127.0.0.1:8000';
axios.defaults.headers.post['Content-Type'] ='application/json';
axios.defaults.headers.post['Content-Type'] ='multipart/form-data';
axios.defaults.headers.post['Accept'] ='application/json';
axios.interceptors.request.use(function (config){

  const token=localStorage.getItem('auth_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
}); 

function App() {
  

  return(
    <>
    <BrowserRouter>
    <Routes>
      <Route exact path="/*"  element={<Home />} />
      <Route element={<AdminPrivateRoute />}>
      <Route  path="/admin/*"  element={<Admin />} />
      </Route>
    </Routes>
    </BrowserRouter>
       
    </>
  )
}

export default App
