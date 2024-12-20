import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios';

const Product = () => {
  const [toogleState, setToogleState] = useState(1);
  const [errorList, setError] = useState([])
  const [picture, setPicture] = useState([])

  const [categoryList, setCategoryList] = useState([])
  const [productInput, setProductInput] = useState({
    category_id:"",
    category_slug:"",
    slug:"",
    name:"",
    description:"",
    
    meta_title:"",
    meta_keywords:"",
    meta_description:"",

    selling_price:"",
    original_price:"",
    qty:"",
    brand:"",
    featured:"",
    popular:"",
    status:"",

  });
  

  const handleInput = (e) => {

    e.persist()
    setProductInput({...productInput, [e.target.name]:e.target.value})

  }

  const handleImage = (e) => {
    setPicture({ image: e.target.files[0] })
  }

  {/*const handleImage = (e) => {

    
   setPicture({ image: e.target.files[0] })
   setPicture([])
   if(e.target[0].files){
    const fileArray = Array.from(e.target[0].files).map((image) => URL.createObjectURL(image))
    setPicture((prevImages) => prevImages.concat(fileArray))
    Array.from(e.target.files).map((image) => URL.revokeObjectURL(image))
   }

  }*/}

  const [allCheckbox, setCheckboxes] = useState([])
  const handleCheckbox = (e) => {

    e.persist()
    setCheckboxes({...allCheckbox, [e.target.name]:e.target.checked})

  }

  const handleState = (index) => {
    setToogleState(index)
  } 
   
  function submitProduct(e){
     e.preventDefault()
     
     const formData = new FormData(); 
     
     formData.append('category_id', productInput.category_id)
     formData.append('category_slug', productInput.category_slug)
     formData.append('slug', productInput.slug)
     formData.append('name', productInput.name)
     formData.append('description', productInput.description)

     formData.append('meta_title', productInput.meta_title)
     formData.append('meta_keywords', productInput.meta_keywords)
     formData.append('meta_description', productInput.meta_description)
     formData.append('selling_price', productInput.selling_price)
     formData.append('original_price', productInput.original_price)
     formData.append('qty', productInput.qty)
     formData.append('brand', productInput.brand)
     formData.append('image', picture.image)
     
      {/*Array.from(picture).forEach(images=>{
        
        formData.append('image[]', images)
      })*/}
    
     
     formData.append('featured', allCheckbox.featured ? '1':'0')
     formData.append('popular', allCheckbox.popular ? '1':'0')
     formData.append('flash_sale', allCheckbox.flash_sale ? '1':'0')
     formData.append('new_product', allCheckbox.new_product ? '1':'0')
     formData.append('status', allCheckbox.status ? '1':'0')




     axios.post('/api/store-product', formData).then(res =>{

      if(res.data.status === 200){
         swal('success', res.data.message, 'success')
         setError([])
      }
      else if(res.data.status === 422){
        swal('All field are mandatory', '', 'error')
        setError(res.data.errors)
      }

     })
  }

  useEffect(() =>{
    axios.get('/api/all-category').then(res =>{
       if(res.data.status === 200){
        setCategoryList(res.data.category)
       }
    })
  }, [])

 {/*const renderPhotos = (source) => {
    return source.map((photo) => {
      return(<img src={photo} alt="" className='w-[50px]'/> )
    });
  
  };*/}


  return (
    <div className="w-full flex flex-col mb-4">
      <div className="mt-4 p-2 flex justify-between bg-gray-300 w-full">
            <h1 className='text-2xl font-bold'>Add Products</h1>
             <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700'><Link to='/admin/viewProduct'>View Products</Link></h2>
    </div>

    <div className='w-full bg-gray-500 pl-4 ml-2'>
      
      <div>
          <button className={toogleState ===1 ? 'p-4 bg-indigo-600' : 'p-4 bg-gray-200'}
          onClick = {() => handleState(1)}>
            <span>Home</span>
          </button>
          <button className={toogleState ===2 ? 'p-4 bg-indigo-600' : 'p-4 bg-gray-200'}
          onClick = {() => handleState(2)}>
            <span>SEO Tags</span>
          </button>
          <button className={toogleState ===3 ? 'p-4 bg-indigo-600' : 'p-4 bg-gray-200'}
          onClick = {() => handleState(3)}>
            <span>Other details</span>
          </button>
          
      </div>
      <form onSubmit={(e) => submitProduct(e)} encType="multipart/form-data">
      <div className={toogleState ===1 ? 'block my-2 w-full' : 'hidden'}>

        <div>
          <label>Select category</label>
          <select name='category_id' onChange={handleInput} value={productInput.category_id} className='w-[95%] border-2 border-gray-900'>
            <option>Select category</option>
            {
              categoryList.map((item) =>{
                return(
                  <option value={item.id} key={item.id}>{item.slug}</option>
                )
              })
            }
          </select>
          <br/>
          <span className="text-red-700 font-bold">{errorList.category_id}</span>
        </div>

        <div>
          <label>Select category</label>
         <select name='category_slug' onChange={handleInput} value={productInput.category_slug} className='w-[95%] border-2 border-gray-900'>
            <option>Select category</option>
            {
              categoryList.map((item) =>{
                return(
                  <option value={item.slug} key={item.id}>{item.name}</option>
                )
              })
            }
          </select>
          <br/>
          <span className="text-red-700 font-bold">{errorList.category_slug}</span>
        </div>
      
        <div>
          <label>Slug</label>
          <br/>
          <input type='text' name='slug' onChange={handleInput} value={productInput.slug} className='w-[95%] border-2 border-gray-900'/>
          <br/>
           <span className="text-red-700 font-bold">{errorList.slug}</span>
        </div>
        <div>
          <label>Name</label>
          <br/>
          <input type='text' name='name' onChange={handleInput} value={productInput.name} className='w-[95%] border-2 border-gray-900' />
          <br/>
           <span className="text-red-700 font-bold">{errorList.name}</span>
        </div>
        <div>
          <label>Description</label>
          <br/>
          <textarea  name='description' onChange={handleInput} value={productInput.description} className='w-[95%] border-2 border-gray-900' ></textarea>
          
       </div>
        
      </div>
      <div className={toogleState ===2 ? 'block my-4' : 'hidden'}>
      <div>
          <label>Mete_Title</label>
          <br/>
          <input type='text' name='meta_title' onChange={handleInput} value={productInput.meta_title} className='w-[95%] border-2 border-gray-900' />
          <br/>
           <span className="text-red-700 font-bold">{errorList.meta_title}</span>
        </div>
      <div>
          <label>Meta_Keywords</label>
          <br/>
          <textarea  name='meta_keywords' onChange={handleInput} value={productInput.meta_keywords} className='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        <div>
          <label>Meta_Description</label>
          <br/>
          <textarea  name='meta_description' onChange={handleInput} value={productInput.meta_description} className='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        
      </div>
    <div className={toogleState ===3 ? 'block my-4' : 'hidden'}>
     <div className='grid md:grid-cols-3 gap-2'>
      <div>
          <label>Selling price</label>
          <br/>
          <input type='text' name='selling_price' onChange={handleInput} value={productInput.selling_price} className=' border-2 border-gray-900' />
          <br/>
           <span className="text-red-700 font-bold">{errorList.selling_price}</span>
        </div>
        <div>
          <label>Original price</label>
          <br/>
          <input type='text' name='original_price' onChange={handleInput} value={productInput.original_price} className=' border-2 border-gray-900' />
           
        </div>
        <div>
          <label>Quantity</label>
          <br/>
          <input type='text' name='qty' onChange={handleInput} value={productInput.qty} className=' border-2 border-gray-900' />
          <br/>
          <span className="text-red-700 font-bold">{errorList.qty}</span>
        </div>
        <div>
          <label>Brand</label>
          <br/>
          <input type='text' name='brand' onChange={handleInput} value={productInput.brand} className=' border-2 border-gray-900' />
          <br/>
          <span className="text-red-700 font-bold">{errorList.brand}</span>
        </div>
        <div className="col-2">
          <label>Image</label>
          <br/>
          <input type='file' name='image'  onChange={handleImage}  className=' border-2 border-gray-900' />
          <br/>
          <span className="text-red-700 font-bold">{errorList.image}</span>
        </div>
        </div>
        {/*<div className='flex gap-8'>
          {renderPhotos(picture)}
        </div>*/}
        <div>
        <div>
          <label>Flash_sale(checked-shown)</label>
          <br/>
          <input type='checkbox' name='featured' onChange={handleCheckbox} defaultChecked={allCheckbox.featured === 1? true:false} /> 
        </div>
        <div>
          <label>Popular(checked-shown)</label>
          <br/>
          <input type='checkbox' name='popular' onChange={handleCheckbox} defaultChecked={allCheckbox.popular === 1? true:false} /> 
        </div>
        <div>
          <label>Status(checked-unshown)</label>
          <br/>
          <input type='checkbox' name='status' onChange={handleCheckbox} defaultChecked={allCheckbox.status === 1? true:false} /> 
        </div>
        </div>
      </div>
      <input type='submit' value='submit' className='border-2 border-gray-400 bg-blue-600 text-gray-100 rounded mb-2  w-[100px]'/>
      </form>
   </div>
  
  </div>
  )
}

export default Product