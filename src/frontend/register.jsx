import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'
import {useNavigate} from 'react-router-dom'


const Register = () => {
  const navigateTo = useNavigate()
  const [picture, setPicture] = useState([])
  const [register, setRegister] = useState({
    name:"",
    email:"",
    merchant:"",
    password:"",
    error_list:[],

  })

  const handleImage = (e) => {

    
    setPicture({ logos: e.target.files[0] })

  }

  const handleInput = (e) => {
    e.persist()
    setRegister({...register, [e.target.name]:e.target.value})
  }

  const registerInput = async(e) => {

    e.preventDefault()

    const formData = new FormData();
    formData.append('name', register.name)
    formData.append('email', register.email)
    formData.append('merchant', register.merchant)
    formData.append('logos', picture.logos)
    formData.append('password', register.password)

    {/*const data = {
      name: register.name,
      email: register.email,
      merchant:register.merchant,
      password: register.password,
    }*/}
     try {
      const response = await axios.post('/api/email/verify',{
        email,
      });

          console.log('Email sent successful!', response.data)

     } catch(error){
      console.error('failed to send email:', error)
     }
    axios.get('/api/csrf-cookie').then(response => {
      axios.post('/api/register', formData).then(res =>{
         if(res.data.status === 200){
              
          localStorage.setItem('auth_token', res.data.token)
          localStorage.setItem('auth_name', res.data.username)
          swal("success", res.data.message, "success")
          navigateTo("/")

         }
         else{
             setRegister({...register, error_list: res.data.validator_errors});
         }
      });
  });

    
  }
  
  return (
    <div className="md:max-w-[700px]  md:border-2 border-blue-700 rounded mt-32 mx-auto">
      <div className=" w-full bg-blue-300 flex justify-center border-b-2 border-blue-400 p-2">
      <h1 className="font-bold text-blue-700">Register</h1>
      </div>
      
      <form onSubmit={registerInput} className="w-full mt-4 flex flex-col items-center">
      <label className="font-bold">Full name</label>
      <input name="name" className="border-2 border-gray-500 rounded w-[40%] text-gray-900" value={register.name} onChange={ handleInput } type="text" placeholder="full name"/>
      <span className="text-red-700 font-bold">{register.error_list.name}</span>
      <br />
      <label className="font-bold">Email</label>
      <input name="email" className="border-2 border-gray-500 rounded w-[40%]" value={register.email} onChange={ handleInput } type="email" placeholder="email"/>
      <span className="text-red-700 font-bold">{register.error_list.email}</span>
      <br />
      <label className="font-bold">Username</label>
      <input name="merchant" className="border-2 border-gray-500 rounded w-[40%]" value={register.merchant} onChange={ handleInput } type="text" placeholder="username"/>
      <span className="text-red-700 font-bold">{register.error_list.merchant}</span>
      <br />
      <label className="font-bold">Business logo</label>
      <input type='file' name='logos' onChange={handleImage}  className=' border-2 border-gray-900 rounded w-[40%]' />
      <span className="text-red-700 font-bold">{register.error_list.logos}</span>
       <br />
      <label className="font-bold">Password</label>
      <input name="password" className="border-2 border-gray-500 rounded w-[40%]" value={register.password} onChange={ handleInput } type="password" placeholder="password"/>
      <span className="text-red-700 font-bold">{register.error_list.password}</span>
      <br />
      <button type="submit"  className=" md:w-[300px] hover:bg-green-600 hover:text-gray-100 place-center mb-2  bg-indigo-300 text-blue-900 font-bold border-2 border-indigo-300 rounded">Sign up</button>
      </form>
      
    </div>

    
    
  )
}

export default Register