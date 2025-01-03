import { APIAuthenticated } from "http"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { updateProductStockAndPrice } from "store/productSlice"
import { updateProductStatus } from "store/productSlice"
import { fetchProduct } from "store/productSlice"

const ProductDetails = () => {
    const {id} = useParams()
        
    const {products} = useSelector((state)=> state.products)
    const [orders, setOrders] = useState([])

    const dispatch = useDispatch()
    const [filteredProduct] = Array.isArray(products) ? products.filter((product) => product?._id === id) : []
 
    const handleProductStatusChange = (e) => {
        // setChangedPaymentStatus(e.target.value)
        dispatch(updateProductStatus(id, e.target.value))
    }
    // console.log(changedPaymentStatus)
    
    const handleProductStockAndPriceChange = (value, name) => {
        let data = {}
        if(name === "tsq") {
            data.productStockQuantity = value 
        }else{
            data.productPrice = value
        }
        console.log(data, "data here")
        dispatch(updateProductStockAndPrice(id, data))
    }
    // const handleProductStockAndPriceChange = (e) => {
    //     // setChangedPaymentStatus(e.target.value)
    //     dispatch(updateProductStockAndPrice(id, changedStockQty, changedProductPrice))
    // }

    
    
 
    useEffect(()=>{
        const fetchProductOrders = async () => {
            const response = await APIAuthenticated.get(`products/productOrders/${id}`)
            if(response.status === 200) {
                setOrders(response.data.data.orders)
            }
    
        }

        fetchProductOrders()
        dispatch(fetchProduct())
    },[id, dispatch])


    // const deleteOrder = async () => {

    //     try {
    //         const response = await APIAuthenticated.delete(`/admin/orders/${id}`)
    //         if(response.status === 200){
    //             navigate("/admin/orders")
    //         }
    //     console.log(response)
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


  return (
    <>
        <div className="py-24 px-4 md:px-6 2xl:px-20 2xl:container 2xl:mx-auto">
    
            <div className="flex justify-start item-start space-y-5 flex-col">
            <h1 className="text-1xl dark:text-black lg:text-2xl font-semibold leading-7 lg:leading-9 text-gray-600">Product {filteredProduct?._id}</h1>
            <p className="text-base dark:text-gray-600 font-medium leading-6 text-gray-600">{new Date(filteredProduct?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="mt-10 flex flex-col xl:flex-row jusitfy-center items-stretch w-full xl:space-x-8 space-y-4 md:space-y-6 xl:space-y-0">
            <div className="flex flex-col justify-start items-start w-full space-y-4 md:space-y-6 xl:space-y-8">
                <div className="flex flex-col justify-start items-start bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Product Details</p>

                <div key={filteredProduct?._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                                <div className="pb-4 md:pb-8 w-full md:w-40">
                                    {/* <img className="w-full hidden md:block" alt="dress" /> */}
                                    <img className="w-full" src={filteredProduct?.productImage} alt=""/>
                                </div>
                                <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                                    <div className="w-full flex flex-col justify-start items-start space-y-8">
                                    <h3 className="text-xl  xl:text-2xl font-semibold leading-6 text-gray-800">Product Name: {filteredProduct?.productName}</h3>
                                    </div>
                                    <div className="flex justify-between space-x-8 items-start w-full">
                                    <p className="text-base  xl:text-lg leading-6"> {filteredProduct?.productDescription}</p>
                                    <p className="text-base  xl:text-lg leading-6">Rs. {filteredProduct?.productPrice}</p>
                                    <p className="text-base  xl:text-lg leading-6 text-gray-800">Status: {filteredProduct?.productStatus}</p>
                                    <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Stock Qty. {filteredProduct?.productStockQuantity}</p>
                                    </div>
                                </div>
                                </div>

                </div>

{/* Order of the product shown below here */}
                <div className="flex flex-col justify-start items-start bg-gray-100 px-4 py-4 md:py-6 md:p-6 xl:p-8 w-full">
                <p className="text-lg md:text-xl  font-semibold leading-6 xl:leading-5 text-gray-800">Product Order Details</p>

               {orders.length > 0 && orders.map((order) => {
                return (
                    
                    <div key={order?._id} className="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
                    <div className="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
                        <div className="w-full flex flex-col justify-start items-start space-y-8">
                        <h3 className="text-sm xl:text-base font-semibold leading-6 text-gray-800">Order Id: {order?._id}</h3>


                        </div>
                        <div className="flex justify-between space-x-8 items-start w-full">
                        {/* <p className="text-base  xl:text-lg leading-6"> {filteredProduct?.productDescription}</p> */}
                        <p className="text-base  xl:text-lg leading-6">Order Status {order?.orderStatus}</p>
                        <p className="text-base  xl:text-lg leading-6 text-gray-800">Shipping Address: {order?.shippingAddress}</p>
                        <p className="text-base  xl:text-lg font-semibold leading-6 text-gray-800">Phone No: {order?.phoneNumber}</p>
                        </div>
                    </div>
    </div>

                )
               })}
                </div>
            </div>
        <div>

        <div className="bg-gray-100 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-2 md:p-1 xl:p-8 flex-col" style={{height:'300px'}}>
                <h3 className="text-xl  font-semibold leading-5 text-gray-800">Update Product</h3>
                <div className="flex flex-col md:flex-row xl:flex-col justify-start items-stretch h-full w-full md:space-x-6 lg:space-x-8 xl:space-x-0">
            
                <div className="flex justify-between xl:h-full items-stretch w-full flex-col mt-6 md:mt-0">
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">

                    <label htmlFor="" >Select Product Status</label>

                    <select onChange={handleProductStatusChange}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                            <option value='available'>available</option>
                            <option value='unavailable'>unavailable</option>
                        </select>

                    </div>
                    <div>
                        <div style={{display: "flex", justifyContent: "space-between" }}>

                            <div>
                                <label htmlFor="" >Product Stock</label>
                                <input onChange={(e) => 
                                    handleProductStockAndPriceChange(e.target.value, "tsq")
                                } type="number" id="tsq" aria-describedby="helper-text-explanation" name="tsq" value={filteredProduct?.productStockQuantity} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8 w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  min={0}/>
                                {/* <input onChange={handleProductStockAndPriceChange} type="number" id="tsq"  name="tsq" min={0}/> */}

                            </div>
                            <div>
                                <label htmlFor="" >Product Price</label>

                                <input onChange={(e) => 
                                    handleProductStockAndPriceChange(e.target.value, "pp")
                                } type="number" name="pp" id="tsq" aria-describedby="helper-text-explanation" value={filteredProduct?.productPrice} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block h-8 w-1/2 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"  min={0}/>

                            </div>

                        </div>
                    </div>
                    {
                        filteredProduct?.orderStatus && filteredProduct?.orderStatus !== ("pending" || "ontheway" || "preparing") && (
                    
                    <div className="flex w-full justify-center items-center md:justify-start md:items-start">
                    <button  className="mt-6 md:mt-0 dark:border-white dark:hover:bg-gray-900 dark:bg-transparent  py-3 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800 border border-gray-800 font-medium w-96 2xl:w-full text-base leading-4 text-gray-800" style={{marginTop:'10px',backgroundColor:'red',color:'white'}} >Delete Order</button>
        
                    </div>
                    )
                }
                </div>
                </div>
            </div>


        <div className="bg-white-50 dark:bg-white-800 w-full xl:w-96 flex justify-between items-center md:items-start px-4 py-2 md:p-1 xl:p-8 flex-col" style={{height:'300px',marginTop:'10px'}}>
            </div>

        </div>
            
            </div>
        </div>                               
    </>
  )
}

export default ProductDetails