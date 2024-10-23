import { STATUSES } from "globals/misc/Statuses";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNewProduct } from "store/productSlice";

const AddProduct = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {status} = useSelector((state) => state.products)
  const {register, handleSubmit, formState} = useForm()
  const handleAddProduct = (data) => {
    const productData = {...data, productImage: data.productImage[0]}
    console.log(productData)
    dispatch(addNewProduct(productData))
    if(status === STATUSES.SUCCESS){
      navigate("/admin/products")
    }
  }
  return (
    <div className="flex items-center justify-center h-screen overflow-hidden">
      <div className="bg-white w-11/12 lg:w-9/12 md:w-6/12 shadow-3xl">
        <form onSubmit={handleSubmit((data) => {
          handleAddProduct(data)
        })} className="p-3 md:p-5" noValidate>
          {/* Product Name Input */}
          <div className="flex flex-col mb-6 md:mb-8">
            <input
              type="text"
              name="productName"
              id="productName"
              className="w-full pl-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              placeholder="Product Name"
            {...register("productName", {required: "ProductName is required"})}/>
            <p className='text-red-500 text-sm italic'>{formState.errors.productName && formState.errors.productName.message}</p>
          </div>
          
          {/* Product Description Input */}
          <div className="flex flex-col mb-6 md:mb-8">
            <textarea
              name="productDescription"
              id="productDescription"
              className="w-full pl-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
              placeholder="Product Description"
              rows={5}
              {...register("productDescription", {required: "productDescription is required"})}
            ></textarea>
            <p className='text-red-500 text-sm italic'>{formState.errors.productDescription && formState.errors.productDescription.message}</p>
          </div>

          {/* Price and Stock Quantity Inputs */}
          <div className="flex justify-between space-x-4">
            <div className="flex flex-col w-1/2 mb-6 md:mb-8">
              <input
                type="number"
                name="productPrice"
                id="productPrice"
                className="w-full pl-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
                placeholder="Product Price"
                {...register("productPrice", {required: "productPrice is required"})}
              />
              <p className='text-red-500 text-sm italic'>{formState.errors.productPrice && formState.errors.productPrice.message}</p>
            </div>
            <div className="flex flex-col w-1/2 mb-6 md:mb-8">
              <input
                type="number"
                name="productStockQuantity"
                id="productStockQuantity"
                className="w-full pl-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
                placeholder="Product Stock Qty"
                {...register("productStockQuantity", {required: "productStockQuantity is required"})}
              />
              <p className='text-red-500 text-sm italic'>{formState.errors.productStockQuantity && formState.errors.productStockQuantity.message}</p>
            </div>
            <div className="flex flex-col w-1/2 mb-6 md:mb-8">
              <input
                type="file"
                name="productImage"
                id="productImage"
                className="w-full pl-4 py-2 bg-gray-200 rounded-lg focus:outline-none"
                placeholder="Product Image"
                {...register("productImage", {required: "productImage is required"})}
              />
              <p className='text-red-500 text-sm italic'>{formState.errors.productImage && formState.errors.productImage.message}</p>
            </div>
          </div>

          {/* Product Status Select */}
          <div className="flex flex-col mb-6 md:mb-8">
            <label htmlFor="productStatus" className="mb-2">Select Product Status</label>
            <select
              name="productStatus"
              id="productStatus"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-32 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("productStatus", {required: "productStatus is required"})}
            >
              <option value='available'>Available</option>
              <option value='unavailable'>Unavailable</option>
            </select>
            <p className='text-red-500 text-sm italic'>{formState.errors.productStatus && formState.errors.productStatus.message}</p>
          </div>

          {/* Submit Button */}
          <button className="w-full p-3 font-medium text-white uppercase bg-gradient-to-b from-gray-700 to-gray-900 md:p-4 rounded-lg">
            Add Product
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddProduct;
