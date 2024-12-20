import React, { useRef, useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { FaChevronDown } from 'react-icons/fa'


// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/grid';
import 'swiper/css/navigation';
import  Pagination  from './pagination'


 //import './styles.css'

// import required modules
import {  Autoplay, Grid, Keyboard, Mousewheel, Navigation} from 'swiper/modules';


const HomeCategory = () => {

    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])
    const [items, setItems] = useState([])
    const [nav, setNav] = useState(false);
     const count = items.length
     const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(12);


    const productcount = product.length;
    const categorycount = category.length;

    // Get current posts
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProduct = product.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1); 
    
    

    


  const handleNav = () => {
    setNav(!nav);
  };
    
    

    useEffect(()=>{

        let isMounted = true

        axios.get('/api/products').then(res =>{
          if(res.data.status === 200){
              setProduct(res.data.products)
              setLoading(false)
          }

        })

          {/*axios.get(`/api/search/${key}`).then(res =>{
            if(res.data.status === 200){
                setItem(res.data.products)
                setLoading(false)
            }

         

      })*/}
      

      axios.get('/api/getCategory').then(res=>{
  
        if(isMounted){
  
        if(res.data.status === 200)
          {
             //console.log(res.data.category)
             setCategory(res.data.category)
             setLoading(false)
          }
  
        }
  
      })
      return() =>{
        isMounted = false
      }
    }, [])

    async function search(key){
      console.warn(key)
 
      let result = await fetch('http://127.0.0.1:8000/api/search/'+key);
      result= await result.json()
      if(result.length){
        setItems(result)
      }
      
    }
    
      


                {/*axios.get('/api/fetchproducts').then(res =>{
                    if(isMounted)
                        {
                            if(res.data.status === 200){
                                setProduct(res.data.product_data.product)
                                setCategory(res.data.product_data.category)
        
                                setLoading(false)
                            }
                            else if(res.data.status === 400){
        
                              swal('warning', res.data.message, 'error')
        
                            }
                            else if(res.data.status === 404){
                                navigateTo('/collection')
                                swal('warning', res.data.message, 'error')
                            }
                        }
                })*/}


     
     const filterItem = ($categ) =>{

      const updateditem = product.filter((curElem) =>{
        return curElem.category_slug === $categ
      })

      setItems(updateditem)

     }      

       
  
    

    if(loading)
        {
          return <h4>Loading product...</h4>
        }
        else{
          var productList = '';
          var categoryList = '';
          var categoryName = '';
          var showCategory ="";
      
          
          showCategory = category.map((item) =>{
            return(
              <SwiperSlide key={item.id}>
                <div className="mx-12">
                  <Link to={`/collection/${item.slug}`}>
                  <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-[100px]'/>
                  </Link>
                  <Link to ={`/collection/${item.slug}`}>
                  <h2>{item.slug}</h2>
                  </Link>
                  
                </div>
                  
                </SwiperSlide>
          
            )
          })

          if(categorycount){
            categoryName = category.map((item)=>{
              return(
                <div className=''>
                
                <h2 className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem(item.slug)}>{item.slug}</h2>
                
              </div>
                
              )
            })
          }

          if(productcount){
           

               productList = product.map((item) =>{
                return(
            
                   <div key={item.id}>
                        
                       <div className="border-2 border-gray-2 rounded">
                             <Link to={`/collection/${item.category.merchant}/${item.merchant}/${item.id}`}>
                             <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-full h-[300px] object-cover' />
                              </Link>
                              <Link to ={`/collection/${item.category.slug}/${item.slug}`}>
                             <h2>{item.name}</h2>
                             </Link>
                    
                          </div>
                       </div> 
                
                      
                          )
                        })
                        
                         

          }

          
          else{
            productList =
            <div>
              <h2>No product available for </h2>
            </div>
          
       
        }
        {/*<div key={item.id}>
                        
                       <div className="border-2 border-gray-2 rounded">
                             <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                             <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-full h-[300px] object-cover' />
                              </Link>
                              <Link to ={`/collection/${item.category.slug}/${item.slug}`}>
                             <h2>{item.name}</h2>
                             </Link>
                    
                          </div>
                       </div>*/}  
         

 if(count){
            productList = items.map((item) =>{
              return(
                
                 <div key={item.id}>
                        
                       <div className="border-2 border-gray-2 rounded ">
                             <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                             <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-full h-[300px] object-cover' />
                              </Link>
                              <Link to ={`/collection/${item.category.slug}/${item.slug}`}>
                             <h2>{item.name}</h2>
                             </Link>
                    
                          </div>
                       </div>  
                
            
              )
            })
          }
          if(count){
            categoryList = items.map((item) =>{
              return(
                <div>
                {
                  nav ? (
                    <div className="fixed w-full float-right cursor-pointer  left-8 bg-gray-100/90 flex flex-col absolute z-20">
                      <ul className='float-right font-bold'>
                      <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem(item.category.slug)}>{item.category.slug}</li>
                    </ul>
                      
                      
                      
                
                    </div>
          
                  ):(
                    null
                  )}
                  
                    <ul className='md:flex hidden gap-4'>
                      <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem(item.category.slug)}>{item.category.slug}</li>
                    </ul>
                  </div>
            
              )
            })
          }
        }

          {/*<div key={item.id}>
                  
                  
                       <div className="border-2 border-gray-2 rounded">
                             <Link to={`/collection/${item.category.slug}/${item.slug}`}>
                             <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-full h-[300px] object-cover' />
                              </Link>
                              <Link to ={`/collection/${item.category.slug}/${item.slug}`}>
                             <h2>{item.name}</h2>
                             </Link>
                    
                          </div>
                       
                    
                  
                    
                 </div>*/} 
      
        
  return (
    <div>
      <div className='flex flex-col items-center justify-center mt-32'>
      <h1 className='mb-2 text-xl font-bold'>Search your one from thousands of products</h1>
      <div className="flex rounded-full bg-indigo-300 border-2 border-gray-400 px-2 w-full max-w-[600px]">
      <button className="self-center flex p-1 cursor-pointer bg-indigo-300"> <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clipRule="evenodd" d="M11.567 9.8895C12.2495 8.90124 12.114 7.5637 11.247 6.7325C10.3679 5.88806 9.02339 5.75928 7.99998 6.4215C7.57983 6.69308 7.25013 7.0837 7.05298 7.5435C6.85867 7.99881 6.80774 8.50252 6.90698 8.9875C7.00665 9.47472 7.25054 9.92071 7.60698 10.2675C7.97021 10.6186 8.42786 10.8563 8.92398 10.9515C9.42353 11.049 9.94062 11.0001 10.413 10.8105C10.8798 10.6237 11.2812 10.3033 11.567 9.8895Z" stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path fill-rule="evenodd" clip-rule="evenodd" d="M12.433 17.8895C11.7504 16.9012 11.886 15.5637 12.753 14.7325C13.6321 13.8881 14.9766 13.7593 16 14.4215C16.4202 14.6931 16.7498 15.0837 16.947 15.5435C17.1413 15.9988 17.1922 16.5025 17.093 16.9875C16.9933 17.4747 16.7494 17.9207 16.393 18.2675C16.0298 18.6186 15.5721 18.8563 15.076 18.9515C14.5773 19.0481 14.0614 18.9988 13.59 18.8095C13.1222 18.6234 12.7197 18.3034 12.433 17.8895V17.8895Z" stroke="#ff5c5c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/> <path d="M12 7.75049C11.5858 7.75049 11.25 8.08627 11.25 8.50049C11.25 8.9147 11.5858 9.25049 12 9.25049V7.75049ZM19 9.25049C19.4142 9.25049 19.75 8.9147 19.75 8.50049C19.75 8.08627 19.4142 7.75049 19 7.75049V9.25049ZM6.857 9.25049C7.27121 9.25049 7.607 8.9147 7.607 8.50049C7.607 8.08627 7.27121 7.75049 6.857 7.75049V9.25049ZM5 7.75049C4.58579 7.75049 4.25 8.08627 4.25 8.50049C4.25 8.9147 4.58579 9.25049 5 9.25049V7.75049ZM12 17.2505C12.4142 17.2505 12.75 16.9147 12.75 16.5005C12.75 16.0863 12.4142 15.7505 12 15.7505V17.2505ZM5 15.7505C4.58579 15.7505 4.25 16.0863 4.25 16.5005C4.25 16.9147 4.58579 17.2505 5 17.2505V15.7505ZM17.143 15.7505C16.7288 15.7505 16.393 16.0863 16.393 16.5005C16.393 16.9147 16.7288 17.2505 17.143 17.2505V15.7505ZM19 17.2505C19.4142 17.2505 19.75 16.9147 19.75 16.5005C19.75 16.0863 19.4142 15.7505 19 15.7505V17.2505ZM12 9.25049H19V7.75049H12V9.25049ZM6.857 7.75049H5V9.25049H6.857V7.75049ZM12 15.7505H5V17.2505H12V15.7505ZM17.143 17.2505H19V15.7505H17.143V17.2505Z" fill="#ff5c5c"/> </g>

</svg></button>

        <input
          type="text"
          onChange={(e)=>search(e.target.value) }
          className="w-full bg-gray-100  flex bg-transparent pl-2 text-gray-900 outline-0"
          placeholder="search your product"
        />
        <button type="submit" className="relative p-2 bg-indigo-300 rounded-full">
          <svg width="30px" height="30px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">

<g id="SVGRepo_bgCarrier" stroke-width="0"/>

<g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"/>

<g id="SVGRepo_iconCarrier"> <path d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/> </g>

</svg>
        </button>
      </div>
</div>

<div className='flex justify-between bg-gray-100 m-8 p-2'>
        <h2 className='text-2xl font-bold'>All categories</h2>
        {/*<div>
        <button onClick={handleNav} className="flex gap-2 justify-center items-center text-xl right-0 z-10 md:hidden" >
          Category <FaChevronDown /></button>
        </div>

         
        {
        nav ? (
          <div className="fixed w-full float-right cursor-pointer  left-8 bg-gray-100/90 flex flex-col absolute z-20">
            <ul className='float-right font-bold'>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => setItems(product)}>All</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Shoes</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("Utensils")}>utensils</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Mobile</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Laptop</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("households")}>Households</li>
          </ul>
            
            
            
      
          </div>

        ):(
          null
        )}
        
          <ul className='md:flex hidden gap-4'>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => setItems(product)}>All</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Shoes</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("Utensils")}>utensils</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Mobile</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Laptop</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("households")}>Households</li>
          </ul>*/}
        
        </div>

        
<Swiper
         navigation={true}
         mousewheel={true}
         keyboard={true}
        
        grid={{
          rows: 2,
          fill: "row" 
        }}
        spaceBetween={20}

        breakpoints={{
          640:{
            slidesPerView:1,
            spaceBetween:20
          },
          768:{
            slidesPerView:2,
            spaceBetween:20
          },
          1024:{
            slidesPerView:3,
            spaceBetween:20
          }
        }}
        
        modules={[Grid, Autoplay, Navigation, Mousewheel, Keyboard]}
        className="mySwiper mt-4 mx-12"
      >
        {showCategory}
       
      </Swiper>
      
      <hr className='bg-gray-900 mt-12 font-bold w-full'/>
    
    
    <div className='flex flex-col justify-center mt-12'>
        <div className='text-center'>
            <h2 className='text-blue-600 text-xl'>Choose your product</h2>
            <h2 className='text-xl'>Buy everything from us</h2>
        </div>
        <div>

      <div className='flex justify-between bg-gray-100 m-8 p-2'>
        <h2 className='text-2xl font-bold'>Our products</h2>
        <div>
        <button onClick={handleNav} className="flex gap-2 justify-center items-center text-xl right-0 z-10 md:hidden" >
          Category <FaChevronDown /></button>
        </div>

         
        {
        nav ? (
          <div className="fixed w-full float-right cursor-pointer  left-8 bg-gray-100/90 flex flex-col absolute z-20">
            <ul className='float-right font-bold'>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => setItems(product)}>All</li>
            {/*<li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Shoes</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("Utensils")}>utensils</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Mobile</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("All")}>Laptop</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onMouseOver={handleNav} onClick={() => filterItem("households")}>Households</li>*/}
          </ul>
            
            
            
      
          </div>

        ):(
          null
        )}
        
          <ul className='md:flex hidden gap-4'>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => setItems(product)}>All</li>
            
            {/*<li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Shoes</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("Utensils")}>utensils</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Mobile</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("All")}>Laptop</li>
            <li className='z-100 hover:bg-blue-500 cursor-pointer' onClick={() => filterItem("households")}>Households</li>*/}
          </ul>

          {categoryName}
        
        </div>
      </div>
        
      {/*<div className="grid md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-4 mt-4 mx-12 h-auto">*/}
      <div className="grid md:grid-cols-4 gap-4 mt-4 mx-12">
        {productList}
      </div>
      <div className='flex flex-col items-center p-2'>
        
      <Pagination
        productsPerPage={productsPerPage}
        totalProducts={product.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      />
      </div>
    </div>
    </div>
    
  )
}

export default HomeCategory