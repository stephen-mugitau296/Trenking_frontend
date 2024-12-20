import React, { useState, useEffect }from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';


const EditCategory = () => {

    const navigateTo = useNavigate()
    const [toogleState, setToogleState] = useState(1);
    const [loading, setLoading] = useState(true);
    const [picture, setPicture] = useState([])
  const [categoryInput, setCategoryInput] = useState({
    slug:"",
    name:"",
    description:"",
    status:"",
    title:"",
    keywords:"",
    meta_description:"",
    error:[],
  });
    const [error, setError] = useState([])
    const { id } = useParams();
    const handleInput = (e) =>{
        e.persist()
        setCategoryInput({...categoryInput, [e.target.name]:e.target.value})
    }

    useEffect(() => {
      
      
      axios.get(`/api/edit-category/${id}`).then(res =>{

         if(res.data.status === 200){
           setCategoryInput(res.data.category)
         }
         else if(res.data.status === 404){
           swal('error', res.data.message, 'error')
           navigateTo('/admin/viewCategory')
         }

      })
      setLoading(false)
    }, [id])
    const handleImage = (e) => {

    
      setPicture({ image: e.target.files[0] })
  
    }

    const updateCategory = (e) =>{
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
       axios.post(`/api/updateCategory/${id}`, formData).then(res =>{
        if(res.data.status === 200){
          swal('success', res.data.message, 'success')
          setError([])
        }
        else if(res.data.status === 422){
          swal('All field madatory', '', 'error')
          setError(res.data.errors)
        }
        else if(res.data.status === 404){
          swal('error', res.data.message, 'error')
          navigateTo('/admin/viewProduct')
        }

       })
    }


    if(loading){
      <h2>Loading category</h2>
   }

    const handleState = (index) => {
      setToogleState(index)
    }
  return (
    <div className='w-full flex flex-col mb-4'>
     <div className='mt-4 p-2 flex justify-between bg-gray-300 w-full mb-4 ml-2'>
        <h1 className='font-bold text-gray-900 text-2xl'>Edit Category</h1>
        <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700'><Link to='/admin/viewCategory'>View Category</Link></h2>
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
      <form onSubmit={updateCategory} id='category_form'>
      <div className={toogleState ===1 ? 'block my-2 w-full' : 'hidden'}>
      
        <div>
          <label>Slug</label>
          <br/>
          <input type='text' name='slug' onChange={handleInput} value={categoryInput.slug} className='w-[95%] border-2 border-gray-900'/>
           <span className="text-red-700 font-bold">{error.slug}</span>
        </div>
        <div>
          <label>Name</label>
          <br/>
          <input type='text' name='name' onChange={handleInput} value={categoryInput.name} className='w-[95%] border-2 border-gray-900' />
          <span className="text-red-700 font-bold">{error.name}</span>
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
          <span className="text-red-700 font-bold">{error.image}</span>
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
           <span className="text-red-700 font-bold">{error.meta_title}</span>
        </div>
      <div>
          <label>Meta_Keywords</label>
          <br/>
          <textarea  name='meta_keywords' onChange={handleInput} value={categoryInput.meta_keywords} className='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        <div>
          <label>Meta_Description</label>
          <br/>
          <textarea  name='meta_description' onChange={handleInput} value={categoryInput.meta_description} className='w-[95%] border-2 border-gray-900' ></textarea>
        </div>
        
      </div>
      <input type='submit' value='Update' className='border-2 border-gray-400 bg-blue-600 text-gray-100 rounded mb-2  w-[100px]'/>
      </form>
   </div>      
   
   
</div>
  )
}

export default EditCategory
