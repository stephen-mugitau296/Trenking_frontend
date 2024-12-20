import React, {useState} from 'react'
import Home from './frontend/Home'
import Dashboard from './Components/Dashboard'
import { BrowserRouter, Routes, Route} from 'react-router-dom'

const Common = () => {
    const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
    <>
     
    <Routes>
      <Route exact path='/' element={<Home/>} />
      <Route exact path='/admin' element={<Dashboard 
        sidebarToggle = {sidebarToggle}
        setSidebarToggle={setSidebarToggle}/>}/> 
    </Routes>
    </>
  )
}

export default Common