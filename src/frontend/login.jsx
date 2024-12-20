import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigateTo = useNavigate()
  const [login, setLogin] = useState({
    email:"",
    password:"",
    error_list:[],
  })

  const handleInput = (e) =>{
    e.persist()
    setLogin({...login, [e.target.name]:e.target.value})
  }
  
  const loginSubmit = (e) => {
    e.preventDefault()

    const data = {
      email: login.email,
      password: login.password
    }
     
    axios.get('/api/csrf-cookie').then(response => {
    axios.post('/api/login', data).then(res =>{
      if(res.data.status === 200){
          
        localStorage.setItem('auth_token', res.data.token)
        localStorage.setItem('auth_name', res.data.username)
        swal("success", res.data.message, "success")
        if(res.data.role === 'admin'){
          navigateTo("/admin")
        }
        else{
          navigateTo("/")
        }
          

      }
      else if(res.data.status === 401){

        swal("warning", res.data.message, "warnimg")

      }
      else{
        setLogin({...login, error_list: res.data.validator_errors})
      }

    })
  })
  }
  return (
    <div className="md:max-w-[700px]  md:border-2 border-blue-700 rounded mt-32 mx-auto">
      <div className=" w-full bg-blue-300 flex justify-center border-b-2 border-blue-400 p-2">
      <h1 className="font-bold text-blue-700">Login</h1>
      </div>
      
      <form onSubmit={loginSubmit}  className="w-full mt-4 flex flex-col items-center">
      <label className="font-bold">Email</label>
      
      <input name="email" className="border-2 border-gray-500 rounded w-[40%]" value={login.email} onChange={ handleInput } type="email" placeholder="email"/>
      <span className="text-red-700 font-bold">{login.error_list.email}</span>
      <br />
      <label className="font-bold">Password</label>
      
      <input name="password" className="border-2 border-gray-500 rounded w-[40%]" value={login.password} onChange={ handleInput } type="password" placeholder="password"/>
      <span className="text-red-700 font-bold">{login.error_list.password}</span>
      <br />
      <button type="submit"  className=" md:w-[300px] hover:bg-green-600 hover:text-gray-100 place-center mb-2  bg-indigo-300 text-blue-900 font-bold border-2 border-indigo-300 rounded">Login</button>
      </form>
      
    </div>
  )
}

export default Login