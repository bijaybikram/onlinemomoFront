import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { deleteProduct } from "store/productSlice"
import { fetchProduct } from "store/productSlice"

const Users = () => {
  
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {products} = useSelector((state)=> state.products)
    // console.log(products, "Hello Products")
  
    const [searchTerm, setSearchTerm] = useState("")
    const [date, setDate] = useState("")
    const defaultDate = () => {
      setDate("")
  }
  

    const filteredProducts = products?.filter((product)=> searchTerm === "" || product.productName.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || product._id.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || product.productStatus.toLowerCase().includes(searchTerm.toLocaleLowerCase()) || product.productPrice.includes(searchTerm.toLocaleLowerCase()))
    .filter((user)=> date === "" || new Date(user?.createdAt).toLocaleDateString() === new Date(date).toLocaleDateString())


    const handleDeleteProduct = (productId) => {
        dispatch(deleteProduct(productId))
        console.log(productId)
    }

    useEffect(()=>{
        dispatch(fetchProduct())
    },[dispatch])

  return (
    <>
        <div className='mx-auto max-w-5xl justify-center px-6 py-16 md:flex md:space-x-6 xl:px-0'>
        <div className="bg-white p-8 rounded-md w-full py-16">
        <div className="my-2 flex sm:flex-row flex-col">
                <div className="flex flex-row mb-1 sm:mb-0">
           
                    <div className="relative">
                        <div
                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </div>
                <div className="block relative">
                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                            <path
                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                            </path>
                        </svg>
                    </span>
                    <input value={searchTerm} onChange={(e)=> {
                        setSearchTerm(e.target.value)
                    }} placeholder="Search"
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="block relative">
                
                    <input value={searchTerm} onChange={(e)=> {
                        setDate(e.target.value)
                    }} 
                    type='date'
                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                </div>
                <div className="block relative">
                <button onClick={defaultDate} type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm mx-4 px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Clear Date</button>
                </div>
            </div>
            <div>
                <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                    <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product ID
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product Name
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Created Date
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product Price
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product Status
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Product Stock
                                    </th>
                                    <th
                                        className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredProducts && filteredProducts.length > 0 && filteredProducts.map((product)=> {
                                        return(
                                            <tr key={product._id}>
                                                <td className="px-2 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <div className="flex items-center">
                                                            <div className="ml-3 cursor-pointer">
                                                                <p onClick={()=> navigate(`/admin/products/${product._id}`)} className="text-blue-900 whitespace-no-wrap">
                                                                    {product._id}
                                                                </p>
                                                            </div>
                                                        </div>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{product.productName}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                    {new Date(product?.createdAt).toLocaleDateString()}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {product?.productPrice}
                                                    </p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <span
                                                        className="relative inline-block px-3 py-1 font-semibold text-green-700 leading-tight">
                                                            {
                                                                product?.productStatus === "unavailable" ? (<span aria-hidden className="absolute inset-0 bg-red-400 opacity-50 rounded-full"></span>): (
                                                                    <span aria-hidden className="absolute inset-0 bg-green-200 opacity-50 rounded-full"></span>
                                                                )
                                                            }
                                                        
                                                    <span className="relative">{product?.productStatus}</span>
                                                    </span>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                    <p className="text-gray-900 whitespace-no-wrap">{product.productStockQuantity}</p>
                                                </td>
                                                <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button onClick={()=> handleDeleteProduct(product?._id)} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </table>
                        <div
                            className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between          ">
                            <span className="text-xs xs:text-sm text-gray-900">
                                Showing 1 to 4 of 50 Entries
                            </span>
                            <div className="inline-flex mt-2 xs:mt-0">
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-l">
                                    Prev
                                </button>
                                &nbsp; &nbsp;
                                <button
                                    className="text-sm text-indigo-50 transition duration-150 hover:bg-indigo-500 bg-indigo-600 font-semibold py-2 px-4 rounded-r">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    </>
  )
}

export default Users