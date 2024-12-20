import React, { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert';
import axios from 'axios';

const EditMoreImages = () => {

    const [selectedFiles, setSelectedFiles] = useState([])
    const { product_id } = useParams();
    const { id } = useParams();
    const [categoryList, setCategoryList] = useState([])
    const [productList, setProductList] = useState([])
    const [loading, setLoading] = useState(true)
    

    const handleImage = (e) => {
   //setPicture({ image: e.target.files[0] })
   setSelectedFiles([])
   if(e.target.files){
    const fileArray = Array.from(e.target.files).map((image) => URL.createObjectURL(image))
    setSelectedFiles((prevImages) => prevImages.concat(fileArray))
    Array.from(e.target.files).map((image) => URL.revokeObjectURL(image))
   }

  }

  function submitImage(e){
    e.preventDefault()

    var files = e.target[0].files
    
    const formData = new FormData(); 

    for(let i=0;i<files.length;i++){
      formData.append('image[]', files[i])
    }

    {/*Array.from(selectedFiles).forEach(images=>{
        
        formData.append('image[]', images)
      })*/}

    axios.post(`/api/store-product-images/${id}`, formData).then(res =>{

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

    axios.get(`/api/edit-product/${id}`).then(res =>{
      if(res.data.status === 200){
        //console.log(res.data.products)
        setProductList(res.data.products)
        
      }
      else if(res.data.status === 404){
        swal("Error", res.data.message, "error")
        navigateTo('/admin/viewProduct')
      }
      
      setLoading(false)
    })
  }, [id])

  const renderPhotos = (source) => {
    return source.map((photo) => {
      return(<img src={photo} alt="" className='w-[50px]'/> )
    });
  
  };

  return (
    <div>
      <div>
                  <h1>{productList.name}</h1>
              
            
          
      </div>
        <form onSubmit={(e) => submitImage(e)} encType="multipart/form-data">
        <div className="col-2 ml-12">
          <label className='font-bold text-xl m-8'>Add more product images</label>
          <br/>
          <input type='file' name='image[]' multiple onChange={handleImage}  className=' border-2 border-gray-900' />
          <br/>
          <span className="text-red-700 font-bold"></span>
        </div>
        
        <div className='flex gap-8 m-8'>
          {renderPhotos(selectedFiles)}
        </div>
        <input type='submit' value='Upload' className='border-2 border-gray-400 bg-blue-600 text-gray-100 rounded ml-12 mb-2 mt-8 w-[100px]'/>
        </form>
    </div>
  )
}

export default EditMoreImages