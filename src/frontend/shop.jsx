import React from 'react'
import Search from './search'
import { FaChevronDown } from 'react-icons/fa'
import HomeCategory from './homeCategory'
import Merchant from './merchant'
import Location from './location'
import Footer from './footer'

const Shop = () => {
  return (
    <div>
      
      <div>
        <HomeCategory />
      </div>
      <div className='m-8'>
        <Merchant />
      </div>
      <div className='m-8'>
         <Location />
      </div>
     
    </div>
  )
}

export default Shop