import React, { useState} from 'react'
import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Category from './Category'
import Product from './product'
import Home from '../frontend/Home'
import routes from '../routes/routes'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const Dashboard = () => {
  const [sidebarToggle, setSidebarToggle] = useState(false)
  return (
    <div>
      <div>
        <Sidebar sidebarToggle={sidebarToggle}/>
      </div>
     <div className={`${sidebarToggle? "" : " ml-64 "}`}>
       <Navbar
          sidebarToggle={sidebarToggle}
          setSidebarToggle={setSidebarToggle}/>
       
    </div> 
      
      
    
    <div className={`${sidebarToggle? "" : " ml-64 "}`}>
      <main>
        
          <Routes>
            <Route exact path="/admin/category" element={<Category/>}/>
          </Routes> 
       
    </main>
    </div>
 
    </div>
  )
}

export default Dashboard