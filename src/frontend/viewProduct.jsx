
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'
import axios from 'axios'


const ViewProduct = () => {
    
    const { slug } = useParams();
    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(true)
    const [product, setProduct] = useState([])
    const [category, setCategory] = useState([])

    const productcount = product.length;
    const categorycount = category.length;

    useEffect(()=>{

        let isMounted = true

        axios.get(`/api/fetchproducts/${slug}`).then(res =>{
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
        })
    }, [slug])

    if(loading)
        {
          return <h4>Loading product...</h4>
        }
        else{
          var productList = '';
          var categoryList = '';
        if(productcount){
          productList = product.map((item) =>{
            return(
              <div key={item.id}>
                <div className="border-2 border-gray-2 rounded">
                  <Link to={`/collection/${item.category.merchant}/${item.merchant}/${item.id}`}>
                  <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className='w-full h-[300px] object-cover' />
                  </Link>
                  <Link to ={`/collection/${item.category.merchant}/${item.merchant}/${item.id}`}>
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
            <h2>No product available for {category.name}</h2>
          </div>

        }

        }
  return (
    <div className='mt-32'>
      <div className='bg-blue-300'>
          collections/ {category.name}
      </div>
      <div className="grid md:grid-cols-4 gap-4 mt-4 mx-12">

        {productList}  
        
      </div>
    </div>
  )
}

export default ViewProduct