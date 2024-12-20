 import React, { useEffect, useState } from "react"
import axios from "axios"
import { Link } from "react-router-dom"

const Collections = () => {

  const [category, setCategory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{

    let isMounted = true;

    axios.get('/api/getCategory').then(res=>{

      if(isMounted){

      if(res.data.status === 200)
        {
           console.log(res.data.category)
           setCategory(res.data.category)
           setLoading(false)
        }

      }

    })
    return() =>{
      isMounted = false
    }
  }, [])

  if(loading)
    {
      return <h1>Loading category</h1>
    }
    else{
      var showCategory =""
      showCategory = category.map((item) =>{
        return(
          <div key={item.id}>
            <div className="m-12">
              <Link to={`/collection/${item.name}`}>
              <img src={`http://127.0.0.1:8000/${item.image}`} alt={item.name} className="w-[100px]"/>
              </Link>
              <Link to ={`/collection/${item.name}`}>
              <h2>{item.name}</h2>
              </Link>
              
            </div>
              
           </div>
      
        )
      })
    }
  return (
    <div className='mt-32'>
      <div className='bg-blue-300'>
         collections page
      </div>
      <div className="grid md:grid-cols-3 gap-4 mt-4">
        
          {showCategory}
        
        
      </div>
      
    </div>
  )
}

export default Collections