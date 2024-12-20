import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { Button, Modal } from "flowbite-react";
import ReactDOM from 'react-dom'
import axios from 'axios'
import { PayPalButtons } from "@paypal/react-paypal-js";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

const initialOptions = {
  "client-id": "AUA4sn_YjJz34xQBEUvahxShOm0e8VNQ6IChQnp_T2apJjCWlbdFDH5rPeeXScdO8OcL4uEa-JlMuapK",
  currency: "USD",
  intent: "capture",
};

const CheckOut = () => {

    const navigateTo = useNavigate()
    const [openModal, setOpenModal] = useState(false)
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    var totalCartPrice = 0;

    if(!localStorage.getItem('auth_token')){

        swal('warning', 'login to goto cart page', 'error')
    }

    const [checkoutInput, setcheckoutInput] = useState({
      'firstname':'',
      'lastname':'',
      'email':'',
      'number':'',
      'address':'',
      'city':'',
      'state':'',
      'zip':'',

    })

    const [error, setError] = useState([])


    useEffect(()=>{

        let isMounted = true

        axios.get('/api/cart').then(res =>{
            if(isMounted)
                {
                    if(res.data.status === 200){
                        setCart(res.data.cart)
                        
                        setLoading(false)
                    }
                   
                    else if(res.data.status === 401){
                        
                        swal('warning', res.data.message, 'error')
                        
                    }
                }
        })
    }, [])

    const handleInput = (e) =>{

      e.persist()
      setcheckoutInput({...checkoutInput, [e.target.name]:e.target.value})


    }

    const orderInfo_data={
         
      firstname: checkoutInput.firstname,
      lastname: checkoutInput.lastname,
      email: checkoutInput.email,
      number: checkoutInput.number,
      address: checkoutInput.address,
      city: checkoutInput.city,
      state: checkoutInput.state,
      zip: checkoutInput.zip,
      payment_mode: 'paid by paypal',
      payment_id: ''
    }


    const onCreateOrder = (data,actions) => {
      return actions.order.create({
          purchase_units: [
              {
                  amount: {
                      //value: totalCartPrice,
                      value: 0.1,
                  },
              },
          ],
      });
  }

  const onApproveOrder = (data,actions) => {
      return actions.order.capture().then(function(details){
        console.log(details)

        orderInfo_data.payment_id = details.id

        axios.post('/api/place-order', orderInfo_data).then(res =>{
          if(res.data.status === 200){
            swal('Order placed successfully', res.data.message, 'success')
            setError([])
            navigateTo('/thank-you')
          }
          else if(res.data.status === 422){
  
            swal('All field are mandatory', res.data.errors)
            setError(res.data.errors)
  
          }
        })
      })
      }
  

    const submitOrder = (e, payment_mode) =>{

      e.preventDefault()

      const data={
         
        firstname: checkoutInput.firstname,
        lastname: checkoutInput.lastname,
        email: checkoutInput.email,
        number: checkoutInput.number,
        address: checkoutInput.address,
        city: checkoutInput.city,
        state: checkoutInput.state,
        zip: checkoutInput.zip,
        payment_mode: payment_mode
      }

      

      switch (payment_mode) {
        case 'cod':
          axios.post('/api/place-order', data).then(res =>{
            if(res.data.status === 200){
              swal('Order placed successfully', res.data.message, 'success')
              setError([])
              navigateTo('/thank-you')
            }
            else if(res.data.status === 422){
    
              swal('All field are mandatory', res.data.errors)
              setError(res.data.errors)
    
            }
          })
          
          break;

        case 'online':

          axios.post('/api/validate-order', data).then(res =>{

            if(res.data.status === 200){

              setOpenModal(true)
              setError([])
              
              
            }
            else if(res.data.status === 422){
    
              swal('All field are mandatory', res.data.errors)
              setError(res.data.errors)
    
            }

          })
          
          break;
      
        default:
          break;
      }
    }

    if(loading)
        {
          return <h4>Loading checkout detail...</h4>
        }

        var checkout_html=''

        if(cart.length > 0){
          checkout_html =<div>

<div class="font-[sans-serif] bg-white">
      <div class="flex max-sm:flex-col gap-12 max-lg:gap-4 h-full">
        <div class="bg-gradient-to-r from-gray-800 via-gray-700 to-gray-800 sm:h-screen sm:sticky sm:top-0 lg:min-w-[370px] sm:min-w-[300px]">
          <div class="relative h-full">
            <div class="px-4 py-8 sm:overflow-auto sm:h-[calc(100vh-60px)]">
              <div class="space-y-4">

              {cart.map((item)=>{
                totalCartPrice += item.product.selling_price * item.product_qty
                return(
                <div key={item.id} class="flex items-start gap-4">
                
                  <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                  <img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} className='w-[50px] object-contain'/>
                  </div>
                  <div class="w-full">
                    <h3 class="text-base text-white">{item.product.name}</h3>
                    <ul class="text-xs text-gray-300 space-y-2 mt-2">
                      <li class="flex flex-wrap gap-4">price<span class="ml-auto">{item.product.selling_price}</span></li>
                      <li class="flex flex-wrap gap-4">Quantity<span class="ml-auto">{item.product_qty}</span></li>
                      <li class="flex flex-wrap gap-4">Total price<span class="ml-auto">{item.product.selling_price * item.product_qty}</span></li>
                    </ul>
                    <div class="md:absolute md:left-0 md:bottom-0 bg-gray-800 w-full p-4">
              <h4 class="flex flex-wrap gap-4 text-base text-white">Grade Total <span class="ml-auto">{totalCartPrice}</span></h4>
            </div>
                  </div>
                 </div>
                )
                })}


               {/* <div class="flex items-start gap-4">
                  <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                    <img src='https://readymadeui.com/images/product11.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-base text-white">Velvet Boots</h3>
                    <ul class="text-xs text-gray-300 space-y-2 mt-2">
                      <li>Size <span class="float-right">37</span></li>
                      <li>Quantity <span class="float-right">2</span></li>
                      <li>Total Price <span class="float-right">$40</span></li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                    <img src='https://readymadeui.com/images/product14.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-base text-white">Echo Elegance</h3>
                    <ul class="text-xs text-gray-300 space-y-2 mt-2">
                      <li>Size <span class="float-right">37</span></li>
                      <li>Quantity <span class="float-right">2</span></li>
                      <li>Total Price <span class="float-right">$40</span></li>
                    </ul>
                  </div>
                </div>

                <div class="flex items-start gap-4">
                  <div class="w-32 h-28 max-lg:w-24 max-lg:h-24 flex p-3 shrink-0 bg-gray-300 rounded-md">
                    <img src='https://readymadeui.com/images/product13.webp' class="w-full object-contain" />
                  </div>
                  <div class="w-full">
                    <h3 class="text-base text-white">Pumps</h3>
                    <ul class="text-xs text-gray-300 space-y-2 mt-2">
                      <li>Size <span class="float-right">37</span></li>
                      <li>Quantity <span class="float-right">2</span></li>
                      <li>Total Price <span class="float-right">$40</span></li>
                    </ul>
                  </div>
                </div>*/}
              </div>
            </div>

            
          </div>
        </div>

        <div class="max-w-4xl w-full h-max rounded-md px-4 py-8 sticky top-0">
          <h2 class="text-2xl font-bold text-gray-800">Complete your order</h2>
          <form class="mt-8">
            <div>
              <h3 class="text-base text-gray-800 mb-4">Personal Details</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <input name="firstname" onChange={handleInput} value={checkoutInput.firstname} type="text" placeholder="First Name"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <br/>
                    <span className='text-red-600'>{error.firstname}</span>
                </div>

                <div>
                  <input name="lastname" onChange={handleInput} value={checkoutInput.lastname} type="text" placeholder="Last Name"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <span className='text-red-600'>{error.lastname}</span>
                </div>

                <div>
                  <input name="email" onChange={handleInput} value={checkoutInput.email} type="email" placeholder="Email"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <span className='text-red-600'>{error.email}</span>
                </div>

                <div>
                  <input name="number" onChange={handleInput} value={checkoutInput.number} type="number" placeholder="Phone No."
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <span className='text-red-600'>{error.number}</span>
                </div>
              </div>
            </div>

            <div class="mt-8">
              <h3 class="text-base text-gray-800 mb-4">Shipping Address</h3>
              <div class="grid md:grid-cols-2 gap-4">
                <div>
                  <input name="address" onChange={handleInput} value={checkoutInput.address} type="text" placeholder="Address Line"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
                <div>
                  <input name="city" onChange={handleInput} value={checkoutInput.city} type="text" placeholder="City"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <span className='text-red-600'>{error.city}</span>
                </div>
                <div>
                  <input name="state" onChange={handleInput} value={checkoutInput.state} type="text" placeholder="State"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                    <span className='text-red-600'>{error.state}</span>
                </div>
                <div>
                  <input name="zip" onChange={handleInput} value={checkoutInput.zip} type="text" placeholder="Zip Code"
                    class="px-4 py-3 bg-gray-100 focus:bg-transparent text-gray-800 w-full text-sm rounded-md focus:outline-blue-600" />
                </div>
              </div>

              <div class="flex gap-4 max-md:flex-col mt-8">
                <button type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 border border-gray-300 text-gray-100 max-md:order-1" onClick={ (e) => submitOrder(e, 'cod')}>place order</button>
                <button type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white" onClick={ (e) => submitOrder(e, 'm-pesa')}>Pay by M-pesa</button>
                <button type="button" class="rounded-md px-6 py-3 w-full text-sm tracking-wide bg-blue-600 hover:bg-blue-700 text-white" onClick={ (e) => submitOrder(e, 'online')}>pay by paypal</button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>

          </div>
        }
        else{
          checkout_html =
            <div className="mt-4 mx-12 flex items-center justify-center border-2 border-gray-500 rounded text-xl p-12">
                <h2>Your shopping cart is empty. You are in checkout page</h2>
            </div>
        }

  return (
    <div className='mt-32'>
       <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              pay via paypal
            </h3>
            <PayPalScriptProvider options={initialOptions}>
            <PayPalButtons 
                        createOrder={(data, actions) => onCreateOrder(data, actions)}
                        onApprove={(data, actions) => onApproveOrder(data, actions)}
                    />
            </PayPalScriptProvider>
            
            <div className="flex justify-center gap-4">
              <Button color="failure" onClick={() => setOpenModal(false)}>
                {"payed"}
              </Button>
              <Button color="gray" onClick={() => setOpenModal(false)}>
                pay later
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
     <div className='bg-blue-300'>
          <h1>Home/ checkout</h1>
      </div>

      <div>
        {checkout_html}
      </div>

      
   </div>    


  )
}

export default CheckOut