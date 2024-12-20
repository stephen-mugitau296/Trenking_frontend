"use client";

import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { Table } from "flowbite-react";
import axios from 'axios';

const ViewCategory = () => {

    const [loading, setLoading] = useState(true);
    const [categoryList, setCategoryList] = useState([]);

    useEffect(()=>{

        axios.get('/api/view-category').then(res=> {
             console.log(res.data.category)
            if(res.status === 200)
            {
               setCategoryList(res.data.category)
            }
            setLoading(false)
        });

    }, []);

    const deleteCategory = (e, id) => {
        e.preventDefault()

        const thisClicked = e.currentTarget
        thisClicked.innerText ="Deleting"

        axios.delete(`/api/delete-category/${id}`).then(res=>{
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

    var view_HtmlTable ="";
    if(loading){
      return <h2>Loading category</h2>
    }
    else
    {
     {/* view_HtmlTable = categoryList.map((item) =>{
      return(
        <Table.Row key={item.id} className="z-10 bg-gray-100 dark:border-gray-700 dark:bg-gray-800">
             <Table.Cell>{item.id}</Table.Cell>
             <Table.Cell>{item.name}</Table.Cell>
             <Table.Cell>{item.slug}</Table.Cell>
             <Table.Cell>{item.description}</Table.Cell>
             <Table.Cell>
             <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700 z-[-10px]'><Link to='/admin/category'>Add Category</Link></h2>
             </Table.Cell>
             <Table.Cell>
               <button type='button' className='bg-red-900 z-10 border-2 border-red-700 rounded'>Delete</button>
             </Table.Cell>
        </Table.Row>
      )
      });*/}
    }

  return (
    <div className='flex flex-col w-full'>
    <div className="mt-4 p-2 flex justify-between bg-gray-300 w-full">
            <h1 className='text-2xl font-bold'>Category list</h1>
             <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700'><Link to='/admin/category'>Add Category</Link></h2>
    </div>
    <div className="overflow-x-auto">
    <table className='border-2 border-green-700 w-[100%]'>
                <tr>
                    <th className='border-b-2 border-gray-900'>Id</th>
                    <th className='border-b-2 border-gray-900'>Slug</th>
                    <th className='border-b-2 border-gray-900'>Name</th>
                    <th className='border-b-2 border-gray-900'>Status</th>
                    <th className='border-b-2 border-gray-900'>Edit</th>
                    <th className='border-b-2 border-gray-900'>Delete</th>
                </tr>
                {categoryList.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className='text-center'>{item.id}</td>
                            <td className='text-center'>{item.slug}</td>
                            <td className='text-center'>{item.name}</td>
                            <td className='text-center'>{item.status}</td>
                            <td className='text-center'><h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700 z-[-10px]'><Link to={`/admin/editCategory/${item.id}`}>Edit</Link></h2></td>
                            <td className='text-center'><button type='button' onClick={(e) => deleteCategory(e, item.id)} className='bg-red-900 z-10 border-2 border-red-700 rounded'>Delete</button></td>
                        </tr>
                    )
                })}
            </table>
      
    </div>
    </div>
  )
}

export default ViewCategory;