import React from 'react'
import Navbar from './navbar'
import Shop from './shop'
import Collections from './collections'
import About from './about'
import Contact from './contact'
import Login from './login'
import Register from './register'
import Cart from './cart'
import { Routes, Route } from 'react-router-dom'
import ViewProduct from './viewProduct'
import ProductDetails from './productDetails'
import CheckOut from './checkOut'
import Footer from './footer'
import UserShop from './userShop'
import ViewUserProduct from './viewUserProduct'



const Home = () => {
  return (
    <div >
      
      <div >
      <Navbar/>
      </div>
      <div>
      <Routes>
        <Route path="/" element={<Shop />} />
        <Route path="/collection" element={<Collections />} />
        <Route path="/shops" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckOut />} />
        <Route path='/collection/:slug'  element={<ViewProduct />} />
        <Route path='/collection/:slug/:merchant'  element={<ViewUserProduct />} />
        <Route path='/shops/:merchant'  element={<UserShop />} />
        <Route path='/collection/:merchant/:product_merchant/:product_id'  element={<ProductDetails />} />
        <Route path='/shops/:merchant/:product_merchant/:product_id'  element={<ProductDetails />} />
        
      </Routes>
      </div>
      <div className='m-8'>
         <Footer />
      </div>
    </div>
  )
}

export default Home