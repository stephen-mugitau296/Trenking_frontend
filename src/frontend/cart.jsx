import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'
import { Link } from 'react-router-dom'

const Cart = () => {

   
    const navigateTo = useNavigate()
    const [loading, setLoading] = useState(true)
    const [cart, setCart] = useState([])
    var totalCartPrice = 0;
    

    if(!localStorage.getItem('auth_token')){

        swal('warning', 'login to goto cart page', 'error')
    }



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

    const handleDecrement = (cart_id) =>{

        setCart(cart=>
            cart.map((item)=>
                cart_id === item.id ? {...item, product_qty:item.product_qty- (item.product_qty > 1 ? 1:0)} : item
            )
        )

        updateCartQuantity(cart_id, 'dec')

    }

    const handleIncrement = (cart_id) =>{

        setCart(cart=>
            cart.map((item)=>
                cart_id === item.id ? {...item, product_qty:item.product_qty+(item.product_qty < 10 ? 1:0)} : item
            )
        )

        updateCartQuantity(cart_id, 'inc')

    }

    const updateCartQuantity = (cart_id, scope) =>{

        axios.put(`/api/cart-updateQuantity/${cart_id}/${scope}`).then(res=>{

            if(res.data.status === 200){
                swal('Success', res.data.message, 'success')
            }

        })
    }

    const deleteCartItem = (e, cart_id) =>{

        e.preventDefault()

        const thisClicked = e.currentTarget
        thisClicked.innerText = 'removing'

        axios.delete(`/api/delete-cartitem/${cart_id}`).then(res =>{
            if(res.data.status === 200){
                swal('Success', res.data.message, 'success')
                thisClicked.closest('tr').remove()
            }
            else if(res.data.status === 404){

                swal('Error', res.data.message, 'error')
                thisClicked.innerText = 'remove'

            }
        })

    }

    if(loading)
        {
          return <h4>Loading cart detail...</h4>
        }

        var cart_html=''

        if(cart.length > 0){

            cart_html =<div> 
            <div className="overflow-x-auto">
    <table className='border-2 border-green-700 w-full'>
                <tr>
                    <th className='border-b-2 border-gray-900'>Image</th>
                    <th className='border-b-2 border-gray-900'>Product</th>
                    <th className='border-b-2 border-gray-900 text-center'>Price</th>
                    <th className='border-b-2 border-gray-900 text-center'>Quantity</th>
                    <th className='border-b-2 border-gray-900 text-center'>Total Price</th>
                    <th className='border-b-2 border-gray-900'>Remove</th>
                    
                </tr>
                {cart.map((item)=>{
                    totalCartPrice += item.product.selling_price * item.product_qty
                    return (

                        <tr>
                        <td className='text-center'><img src={`http://127.0.0.1:8000/${item.product.image}`} alt={item.product.name} className='w-[50px]'/></td>
                        <td className='text-center'>{item.product.name}</td>
                        <td className='text-center'>{item.product.selling_price}</td>
                        <td className='text-center'>
                        <div class="inline-flex items-center mt-2">
        <button onClick={()=>handleDecrement(item.id)}
            class="bg-white rounded-l border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
            </svg>
        </button>
        <div
            class="bg-gray-100 border-t border-b border-gray-100 text-gray-600 hover:bg-gray-100 inline-flex items-center px-4 py-1 select-none">
            {item.product_qty}
        </div>
        <button onClick={()=>handleIncrement(item.id)}
            class="bg-white rounded-r border text-gray-600 hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center px-2 py-1 border-r border-gray-200">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-4" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
        </button>
    </div>
                        </td>
                        <td>{item.product.selling_price * item.product_qty}</td>
                        <td className='text-center'><button onClick={(e) => deleteCartItem(e, item.id)} className='text-2xl font-bold text-gray-100 border-2 border-red-700 rounded bg-red-700 z-[-10px]'>remove</button></td>
                        
                    </tr>
                

                    )
                })}
                       
    
            </table>

            </div>

            <div className=' mt-4 border-2 border-gray-400 flex flex-col float-right w-[40%]'>
        
        <h3>SubTotal:
            <span className='float-right'>{totalCartPrice}</span>
        </h3>
        <h3>
            Grade Total:
            <span className='float-right'>{totalCartPrice}</span>
        </h3>
        <hr/>
        <button className='bg-blue-700'><Link to='/checkout'>Checkout</Link></button>
        

       </div>

      
    </div>

        }
        else{
            cart_html =
            <div className="flex items-center justify-center border-2 border-gray-500 rounded text-xl p-12">
                <h2>Your shopping cart is empty</h2>
            </div>
        }
  return (
    <div className='mt-32'>
         <div className='bg-blue-300'>
          Home/ cart
      </div>
      <div className=" mt-4 mx-12">
        <div>
            {cart_html}
        </div>

       
      </div>
    </div>
  )
}

export default Cart