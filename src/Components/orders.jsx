import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const Orders = () => {

    const [loading, setLoading] = useState(true);
    const [ordersList, setOrdersList] = useState([]);

    useEffect(() =>{
         
        axios.get('/api/admin/orders').then(res =>{
            if(res.data.status === 200){
                setOrdersList(res.data.orders)
                setLoading(false)
            }

        }, [])
    })

    if(loading){
        return <h1>Loading Orders list</h1>
    }

  return (
    <div className='flex flex-col w-full'>
    <div className="mt-4 p-2 flex justify-between bg-gray-300 w-full">
            <h1 className='text-2xl font-bold'>Orders list</h1>
             <h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700'><Link to='/admin/product'>Back</Link></h2>
    </div>
    <div className="overflow-x-auto">
    <table className='border-2 border-green-700 w-[100%]'>
                <tr>
                    <th className='border-b-2 border-gray-900'>ID</th>
                    <th className='border-b-2 border-gray-900'>Tracking_no</th>
                    <th className='border-b-2 border-gray-900'>Phone</th>
                    <th className='border-b-2 border-gray-900'>Email</th>
                    <th className='border-b-2 border-gray-900'>Action</th>
                </tr>
                {ordersList.map((item) => {
                    return (
                        <tr key={item.id}>
                            <td className='text-center'>{item.id}</td>
                            <td className='text-center'>{item.tracking_no}</td>
                            <td className='text-center'>{item.number}</td>
                            <td className='text-center'>{item.email}</td>
                            <td className='text-center'><h2 className='text-2xl font-bold text-gray-100 border-2 border-blue-700 rounded bg-blue-700 z-[-10px]'><Link to={`view-orders/${item.id}`}>View</Link></h2></td>
                            <td className='text-center'>{item.status === 0? 'visible':'hidden'}</td>
                        </tr>
                    )
                })}
            </table>
      
    </div>
    </div>
  )
}

export default Orders