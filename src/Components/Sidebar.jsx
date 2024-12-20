import React from 'react'
import { Link } from 'react-router-dom'


const Sidebar = ({sidebarToggle}) => {
  return (
    <div className = {`${sidebarToggle? " hidden " : " block "}w-64 bg-gray-800 fixed h-full px-2 py-2`}>
        <div className='my-2 mb-4'>
            <h1 className='text-2x text-white'>Adim Dashboard</h1>
        </div>
        <hr/>
        <ul className='text-white mt-3 font-bold'>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to="/admin">DashBoard</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to='/admin/category'>Add Category</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to='/admin/viewCategory'>View Category</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to="/admin/product">Products</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to="/admin/viewProduct">View Products</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <Link to="/admin/orders">Orders</Link>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <a href="">Inbox</a>
            </li>
            <li className='mb-2  rounded hover:shadow hover:bg-blue-500 py-2'>
            <a href="">Settings</a>
            </li>
           
            

            
        </ul>
    </div>
  )
}

export default Sidebar