import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaBars, FaCircle, FaShoppingCart, FaTimes } from 'react-icons/fa'
import axios from 'axios'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { FaUserCircle } from 'react-icons/fa'
import {
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Button,
} from "@material-tailwind/react";

const Navbar = () => {
  const navigateTo = useNavigate()
  const [nav, setNav] = useState(false);
  const [headerFixed, setHeaderFixed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if(window.scrollY > 100){
        setHeaderFixed(true);
      } else{
        setHeaderFixed(false);
      }
    }; 
    window.addEventListener("scroll", handleScroll);
     
    return () => {
      window.addEventListener("scroll", handleScroll);
    }
  });

  const handleNav = () => {
    setNav(!nav);
  };

  const logSubmit = (e) => {
    e.preventDefault()

    axios.post("/api/logout").then(res=> {
      if(res.data.status === 200){
          localStorage.removeItem('auth_token')
          localStorage.removeItem('auth_name')
          swal("success", res.data.message, "success")
          navigateTo("/")

      }
    })
  }
   
  var AuthbuttonMd = ""
  var AuthbuttonSm = ""

  if(!localStorage.getItem('auth_token'))
    {
      AuthbuttonMd =(
    
        <Menu>
      <MenuHandler>
        <Button><FaUserCircle className='w-6 h-6'/></Button>
      </MenuHandler>
      <MenuList>
        <MenuItem> 
        <ul className="hidden md:flex items-center gap-8 text-blue-900 z-10 ">
          <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/login">Login</Link>
            </li>
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
               <Link to="/register">Register</Link>
            </li>
        </ul>
        </MenuItem>
        
        
      </MenuList>
    </Menu>

      )
        {/*<ul className="hidden md:flex items-center gap-8 text-blue-900 z-10 ">
          <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/login">Login</Link>
            </li>
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
               <Link to="/register">Register</Link>
            </li>
        </ul>*/}
      
      AuthbuttonSm =(
        <Menu>
        <MenuHandler>
          <Button><FaUserCircle className='w-6 h-6'/></Button>
        </MenuHandler>
        <MenuList>
          <MenuItem> <Link to="/login">Login</Link></MenuItem>
          <MenuItem><Link to="/register">Register</Link></MenuItem>
          
        </MenuList>
      </Menu>
      )
        {/*<ul>
          <li onClick={handleNav}  className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
             <Link to="/login">
             Login
            </Link>
            </li>
            <li onClick={handleNav}  className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
              <Link to="/register">
              Register
            </Link>
            </li>
            </ul>*/}
        
    }
    else {
      AuthbuttonMd=(

        <Menu>
        <MenuHandler>
          <Button><FaUserCircle className='w-6 h-6'/></Button>
        </MenuHandler>
        <MenuList>
          <MenuItem> 
          <ul>
      <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
         <button type='button' onClick={logSubmit}>LogOut</button>
      </li>
      </ul>
          </MenuItem>
          
          
        </MenuList>
      </Menu>
      )
      {/*<ul>
      <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
         <button type='button' onClick={logSubmit}>LogOut</button>
      </li>
      </ul>*/}
      
      AuthbuttonSm=(
        
<Menu>
        <MenuHandler>
          <Button><FaUserCircle className='w-6 h-6'/></Button>
        </MenuHandler>
        <MenuList>
          <MenuItem>
          <button className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold" type='button' onClick={logSubmit}>LogOut</button>
          </MenuItem>
          
          
        </MenuList>
      </Menu>
        
           
        )
    }
  
    
    
  return (
    
    <div className="w-full fixed z-10 md:flex justify-between  items-center bg-indigo-300 p-2 md:p-4 top-0 md:mb-8">
          <div className='flex justify-end md:hidden'>
             <Link to="/cart" className="rounded-full shadow-lg bg-gray-100 text-yellow-500 shadow-gray-100 mb-2 p-2 cursor-poniter hover:scale-100 ease-in duration-200">
                 <i><FaShoppingCart size={25} className='bg-gray-100 rounded'/></i>
                 
            </Link>
            
          </div>
        <div className='flex justify-between items-center' >
            <Link to="/"><h1 className="text-2xl font-bold text-blue-900 hover:text-green-700 transition">Trenking Shop</h1></Link>
            <div className='z-10 md:hidden'>
            {AuthbuttonSm}
            </div>
            <button onClick={handleNav} className="right-0 z-10 md:hidden" >
          {nav ? <FaTimes/> : <FaBars/>}</button>
        </div>

      
      {
        nav ? (
          <div className="fixed w-full h-screen cursor-pointer top-16 left-8 bg-gray-600/90 flex flex-col z-20">
            <Link onClick={handleNav}
             to="/" className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
              Shop
            </Link>
            <Link onClick={handleNav} to="/collection" className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
             Collections
            </Link>
            <Link onClick={handleNav} to="/shops" className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
             Shops
            </Link>
            <Link onClick={handleNav} to="/contact" className="w-[75%] flex justify-center items-center rounded-full shadow-lg bg-gray-100 shadow-gray-100 m-2 p-4 cursor-poniter hover:scale-100 ease-in duration-200">
             Contact
            </Link>
            
            
            
      
          </div>

        ):(
          null
        )}
        <div>
        <ul className="hidden md:flex items-center gap-8 text-blue-900 z-10 " >
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/">Home</Link>  
            </li>
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/collection">Collections</Link>
            </li>
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/shops">Shops</Link>
            </li>
            <li className="font-bold hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/contact">Contact</Link>
            </li>
            {AuthbuttonMd}
    
            <li className="font-bold text-yellow-500 hover:text-green-700 hover:border-b-2 hover:border-gray-100 hover:font-bold">
                <Link to="/cart"><i><FaShoppingCart size={40} className='bg-gray-100 rounded'/></i></Link>
            </li>
            
        </ul>
        
        </div>
        
        

    </div>
    
  )
}

export default Navbar