import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { createOrder } from '../../store/checkoutSlice'
import { STATUSES } from '../../globals/misc/Statuses'
import { useNavigate } from 'react-router-dom'
import { APIAuthenticated } from '../../http'
import { emptyCart } from '../../store/cartSlice'

const Checkout = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {items: products} = useSelector((state) => state.cart)
    const {status, data} = useSelector((state)=> state.checkout)
    const subTotalAmount = products.reduce((amount, item)=> amount + item?.quantity * item?.product.productPrice, 0  )
    const shippingAmount = 100
    const totalAmount = subTotalAmount + shippingAmount

    // handle form with react-hook-form
    const {register, handleSubmit, formState} = useForm()

    const [paymentMethod, setPaymentMethod] = useState("")

    // Function to handle the order for checkout
    const handleOrder = async (data) => {
        const orderDetails = {
            items: products,
            totalAmount: totalAmount,
            shippingAddress: data.shippingAddress,
            phoneNumber: data.phoneNumber,
            paymentDetails: {
                method: paymentMethod
            },
        }

        dispatch(createOrder(orderDetails))

    }

    // to proceed for payment with conditions
    const proceedForPayment = () => {
        // const latestOrderData = data?.[data.length -1]
        // console.log(latestOrderData, "haha")
        if(paymentMethod === "COD" && status === STATUSES.SUCCESS && data.length > 0){

            alert("Order placed succesfully with COD!")
            navigate("/")
            dispatch(emptyCart())
        }
        if(paymentMethod === "khalti" && status === STATUSES.SUCCESS && data.length > 0){
            const {totalAmount, _id: orderId} = data[data.length - 1]
            handleKhaltiPayment(orderId, totalAmount)
            console.log(totalAmount, "Total Amount")
        }

        if (status === STATUSES.ERROR) {
            alert("Something went wrong with order checkout!")
        }
    }

    useEffect(()=> {
        proceedForPayment()
    },[data, status])

    // handle change of payment option
    const handlePaymentChange = (e)=> {
        return setPaymentMethod(e.target.value)
    }

    // handling payment with khalti
    const handleKhaltiPayment = async (orderId, totalAmount) => {
        try {
            const response = await APIAuthenticated.post("/payment/", {orderId, amount: totalAmount})
            if(response.status === 200){
                window.location.href = response.data.paymentUrl
            }
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <>
        <div className="grid sm:px-10 py-20 lg:grid-cols-2 lg:px-20 xl:px-32">
        <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">Check your items. And select a suitable shipping method.</p>
            <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            

           {
            products.length >  0 && products.map((product)=> {
                return (
                    <div key={product?.product._id} className="flex flex-col rounded-lg bg-white sm:flex-row">
                    <img className="m-2 h-24 w-28 rounded-md border object-cover object-center" src={product?.product?.productImage} alt="" />
                    <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{product?.product?.productName}</span>
                    <span className="float-right text-gray-400">Qty. {product?.quantity}</span>
                    <p className="text-lg font-bold">Rs. {product?.product?.productPrice}</p>
                    </div>
                </div>
                )
            })
           }
    
            </div>

            <p className="mt-8 text-lg font-medium">Payment Methods</p>
            <form className="mt-5 grid gap-6">
            <div className="relative">
                <input className="peer hidden" id="radio_1" type="radio" value="COD" name="radio" onChange={handlePaymentChange} checked={paymentMethod === "COD"}/>
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_1">
                <img className="w-14 object-contain" src="/images/naorrAeygcJzX0SyNI4Y0.png" alt="" />
                <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash On Delivery</span>
                </div>
                </label>
            </div>
            <div className="relative">
                <input className="peer hidden" id="radio_2" type="radio" value="khalti" name="radio" onChange={handlePaymentChange} checked={paymentMethod === "khalti"}/>
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
                <label className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4" htmlFor="radio_2">
                <img className="w-14 object-contain" src="/images/oG8xsl3xsOkwkMsrLGKM4.png" alt="" />
                <div className="ml-5">
                    <span className="mt-2 font-semibold">Khalti</span>
                </div>
                </label>
            </div>
            </form>
        </div>
       <form onSubmit={handleSubmit((data)=>{
        handleOrder(data)
       })} noValidate>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
            <p className="text-xl font-medium">Payment Details</p>
            <p className="text-gray-400">Complete your order by providing your payment details.</p>
            
            <div className="">

            <label htmlFor="email" className="mt-4 mb-2 block text-sm font-medium">Email</label>
            <div className="relative">
                <input type="text" id="email" name="email" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="your.email@gmail.com" 
                {...register("email", {required: "Email is required"})} />
                <p className='text-red-500 text-sm italic'>{formState.errors.email && formState.errors.email.message}</p>

                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
                </div>
            </div>


            <label htmlFor="phoneNumber" className="mt-4 mb-2 block text-sm font-medium">Phone Number</label>
            <div className="relative">
                <input type="number" id="phoneNumber" name="phoneNumber" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Your Phone Number" {...register("phoneNumber", {required : "Phone Number is required!"})} />
                <p className='text-red-500 text-sm italic'>{formState.errors.phoneNumber && formState.errors.phoneNumber.message}</p>
            </div>


            <label htmlFor="billing-address" className="mt-4 mb-2 block text-sm font-medium">Shipping Address</label>
            <div className="flex flex-col sm:flex-row">
                <div className="relative flex-shrink-0 sm:w-7/12">
                <input type="text" id="billing-address" name="shippingAddress" className="w-full rounded-md border border-gray-200 px-4 py-3 pl-11 text-sm shadow-sm outline-none focus:z-10 focus:border-blue-500 focus:ring-blue-500" placeholder="Street Address" {...register("shippingAddress", {required: "Shipping Address is required"})} />
                <p className='text-red-500 text-sm italic'>{formState.errors.shippingAddress && formState.errors.shippingAddress.message}</p>
                <div className="pointer-events-none absolute inset-y-0 left-0 inline-flex items-center px-3">
                    <img className="h-4 w-4 object-contain" src="https://flagpack.xyz/_nuxt/4c829b6c0131de7162790d2f897a90fd.svg" alt="" />
                </div>
                </div>

            </div>

            {/* <!-- Total --> */}
            <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">Rs. {subTotalAmount}</p>
                </div>
                <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">Rs. {shippingAmount}</p>
                </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">Rs. {totalAmount}</p>
            </div>
            </div>
            {
                paymentMethod === "COD" ? (
                    <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">Pay After Delivery</button>
                ) : (<button className="mt-4 mb-8 w-full rounded-md bg-purple-900 px-6 py-3 font-medium text-white">Pay Online With Khalti</button>)
            }
        </div>
       </form>
        </div>

    </>
  )
}

export default Checkout