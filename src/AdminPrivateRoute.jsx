import React, { useState, useEffect } from 'react'
import { Outlet, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
 

const AdminPrivateRoute = () => {

   const navigateTo = useNavigate()

  const[Authenticated, setAuthenticated] = useState(false)
  const[loading, setLoading] = useState(true)
  useEffect(() => {

    axios.get('/api/checkingAuthenticated').then(res => {
       if(res.status === 200){
          setAuthenticated(true)
       }
       setLoading(false)
    })
   
    axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err){
      if(err.response.status === 401){
       swal('unauthorized', err.response.data.message, 'warning')
       navigateTo("/login")
      }
      else if(err.response.status === 403){
        swal('forbidden', err.response.data.message, 'warning');
        navigateTo("/")
      }
      else if(err.response.status === 404){
        swal('404 error', 'Url/page not found', 'warning')
        navigateTo("/")
      }
      return promise.reject(err)
   })


return () =>{
      setAuthenticated(false)
    }
    
  }, []);
    
 
  
    {/*axios.interceptors.response.use(function(response){
      return response;
       }, function(error){ 
        if(error.response.status === 403){
          swal('forbidden', error.response.data.message, 'warning');
          navigateTo("/")
        }
        else if(error.response.status === 404){
          swal('404 error', 'Url/page not found', 'warning')
          navigateTo("/")
        }
        return promise.reject(error);
    })*/}
  
  

 
  if(loading){
    return <h1>loading...</h1>
  }
  return (
      
        Authenticated? <Outlet /> : <Navigate to="/login" />
        
    
    
    
  )
}


export default AdminPrivateRoute;