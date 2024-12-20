import React from 'react'
import { useState } from "react";
import axios from 'axios';
import swal from 'sweetalert';



const Category = () => {

  const [toogleState, setToogleState] = useState(1);
  const [picture, setPicture] = useState([])
  const [categoryInput, setCategoryInput] = useState({
    slug:"",
    name:"",
    description:"",
    status:"",
    title:"",
    keywords:"",
    meta_description:"",
    error_list:[],
  });

  const handleInput = (e) => {

    e.persist()
    setCategoryInput({...categoryInput, [e.target.name]:e.target.value})

  }

  
  const handleImage = (e) => {

    
    setPicture({ image: e.target.files[0] })

  }

  const submitCategory = (e) => {
    e.preventDefault()

    const formData = new FormData(); 
     
     formData.append('slug', categoryInput.slug)
     formData.append('name', categoryInput.name)
     formData.append('description', categoryInput.description)
     formData.append('image', picture.image)
     formData.append('status', categoryInput.status)
     formData.append('meta_title', categoryInput.meta_title)
     formData.append('meta_keywords', categoryInput.meta_keywords)
     formData.append('meta_description', categoryInput.meta_description)

    {/*const data = {
      slug:categoryInput.slug,
      name:categoryInput.name,
      description:categoryInput.description,
      status:categoryInput.status,
      meta_title:categoryInput.meta_title,
      meta_keywords:categoryInput.meta_keywords,
      meta_description:categoryInput.meta_description

    }*/}
    axios.post('/api/store-category', formData).then(res => {
      if(res.data.status === 200){
          swal('success', res.data.message, 'success')
          document.getElementById('category_form').reset()
      }
      else if(res.data.status === 400){

        setCategoryInput({...categoryInput, error_list: res.data.errors})
        
      }
    })
  }

  const handleState = (index) => {
    setToogleState(index)
  }
  
  return (
    <div className='w-full flex flex-col mb-4'>
     <div className='w-full mb-4 ml-2'>
        <h1 className='font-bold text-gray-900 text-2xl'>Add Category</h1>
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
          
      </div>
      <form onSubmit={submitCategory} id='category_form'>
      <div className={toogleState ===1 ? 'block my-2 w-full' : 'hidden'}>
      
        <div>
          <label>Slug</label>
          <br/>
          <input type='text' name='slug' onChange={handleInput} value={categoryInput.slug} className='w-[95%] border-2 border-gray-900'/>
           <span className="text-red-700 font-bold">{categoryInput.error_list.slug}</span>
        </div>
        <div>
          <label>Name</label>
          <br/>
          <input type='text' name='name' onChange={handleInput} value={categoryInput.name} className='w-[95%] border-2 border-gray-900' />
          <span className="text-red-700 font-bold">{categoryInput.error_list.name}</span>
        </div>
        <div>
          <label>Description</label>
          <br/>
          <textarea  name='description' onChange={handleInput} value={categoryInput.description} className='w-[95%] border-2 border-gray-900' ></textarea>
          
       </div>
       <div className="col-2">
          <label>Image</label>
          <br/>
          <input type='file' name='image' onChange={handleImage}  className=' border-2 border-gray-900' />
          <br/>
          <span className="text-red-700 font-bold">{categoryInput.error_list.image}</span>
        </div>
        <div>
          <label>Status</label>
          <br/>
          <input type='checkbox' name='status' onChange={handleInput} value={categoryInput.status} /> status 0=shown/1=hidden
        </div>
      </div>
      <div className={toogleState ===2 ? 'block my-4' : 'hidden'}>
      <div>
          <label>Mete_Title</label>
          <br/>
          <input type='text' name='meta_title' onChange={handleInput} value={categoryInput.meta_title} className='w-[95%] border-2 border-gray-900' />
           <span className="text-red-700 font-bold">{categoryInput.error_list.meta_title}</span>
        </div>
      <div>
          <label>Meta_Keywords</label>
          <br/>
          <textarea  name='meta_keywords' onChange={handleInput} value={categoryInput.meta_keywords} className='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        <div>
          <label>Meta_Description</label>
          <br/>
          

          
          <textarea  name='meta_description' onChange={handleInput} value={categoryInput.meta_description} classNameName='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        
      </div>
      <input type='submit' value='submit' classNameName='border-2 border-gray-400 bg-blue-600 text-gray-100 rounded mb-2  w-[100px]'/>
      </form>
   </div>      
   
   
</div>
  )
}

export default Category