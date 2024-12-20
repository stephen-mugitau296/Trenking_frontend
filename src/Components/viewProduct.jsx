import axios from 'axios';
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';

const ViewProduct = () => {
    const [loading, setLoading] = useState(true);
    const [productList, setProductList] = useState([]);

    useEffect(() =>{
         
        axios.get('/api/view-product').then(res =>{
            if(res.data.status === 200){
                setProductList(res.data.products)
                setLoading(false)
            }

        }, [])
    })

    const deleteProduct = (e, id) => {
        e.preventDefault()

        const thisClicked = e.currentTarget
        thisClicked.innerText ="Deleting"

        axios.delete(`/api/delete-product/${id}`).then(res=>{
          if(res.data.status === 200)
            {
              swal('success', res.data.message, 'success')
              thisClicked.closest('tr').remove()
            }
            else if(res.data.status === 404){
              
              swal('error', res.data.message, 'error')
              thisClicked.innerText ="Delete"
            }
        })
    }

    if(loading){
        return <h1>Loading view product</h1>
    }
  return (
    <div className='flex flex-col w-full'>
    <div className="mt-4 p-2 flex justify-between bg-gray-300 w-full">
            <h1 className='text-2xl font-bold'>Product list</h1>
             <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700'><Link to='/admin/product'>Add Product</Link></h2>
    </div>
    <div className="overflow-x-auto">
    <table className='border-2 border-green-700 w-[100%]'>
                <tr>
                    <th className='border-b-2 border-gray-900'>ID</th>
                    <th className='border-b-2 border-gray-900'>Category Name</th>
                    <th className='border-b-2 border-gray-900'>Product Name</th>
                    <th className='border-b-2 border-gray-900'>Selling price</th>
                    <th className='border-b-2 border-gray-900'>Image</th>
                    <th className='border-b-2 border-gray-900'>Edit</th>
                    <th className='border-b-2 border-gray-900'>Add images</th>
                    <th className='border-b-2 border-gray-900'>Delete</th>
                </tr>
                {productList.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className='text-center'>{item.id}</td>
                            <td className='text-center'>{item.category.name}</td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.selling_price}</td>
                            <td><img src={`http://127.0.0.1:8000/${item.image}`} alt='image' className='w-[50px]'/></td>
                            <td className='text-center'><h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700 z-[-10px]'><Link to={`/admin/editProduct/${item.id}`}>Edit</Link></h2></td>
                            <td className='text-center'><h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-green-700 z-[-10px]'><Link to={`/admin/editMoreImages/${item.id}`}>Add more images</Link></h2></td>
                            <td className='text-center'><button type='button' onClick={(e) => deleteProduct(e, item.id)} className='bg-red-900 z-10 border-2 border-red-700 rounded'>Delete</button></td>
                        </tr>
                    )
                })}
            </table>
      
    </div>
    </div>
  )
}

export default ViewProduct