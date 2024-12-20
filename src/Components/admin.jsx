import React from 'react'
import Dashboard from './Dashboard'
import Category from './Category'
import Product from './product'
import Home from './home'
import ViewCategory from './viewCategory'
import { Routes, Route} from 'react-router-dom'
import EditCategory from './editCategory'
import EditProduct from './editProduct'
import ViewProduct from './viewProduct'
import Orders from './orders'
import EditMoreImages from './editMoreImages'

const Admin = ({sidebarToggle, setSidebarToggle}) => {
  return (
    <div>
        <Dashboard 
        sidebarToggle = {sidebarToggle}
        setSidebarToggle={setSidebarToggle}/>
      <div className={`${sidebarToggle? "" : " ml-64 "}`}>
        <Routes>
           <Route  path="/"  element={<Home />}/>
          <Route  path="/category"  element={<Category />}/>
          <Route  path="/viewCategory"  element={<ViewCategory />}/>
          <Route  path="/viewProduct"  element={<ViewProduct />}/>
          <Route  path="/orders"  element={<Orders />}/>
          <Route  path="/editCategory/:id"  element={<EditCategory />}/>
          <Route  path="/editProduct/:id"  element={<EditProduct />}/>
          <Route  path="/editMoreImages/:id"  element={<EditMoreImages />}/>
          <Route  path="/product"  element={<Product />}/>
         
          
        </Routes>
      </div>
    
    </div>
  )
}

export default Admin