import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProductDetails } from '../../../store/productSlice'

const Review = ({id: productId}) => {

    const {selectedProduct , status} = useSelector((state)=> state.product)
    
    const {productReviews} = selectedProduct
    // console.log(productReviews, "hell 111111o")
    const dispatch = useDispatch()  
    
    useEffect(()=> {
    dispatch(fetchProductDetails(productId))
    },[productId])

  return (
    <>
        {/* <!-- component --> */}
        <div className="bg-black flex justify-center items-center h-auto p-10">
            <div className="md:w-4/5 w-3/4 px-10 flex flex-col gap-2 p-5 bg-black text-white">
                <h1 className="py-5 text-lg">Reviews</h1>
                <div className="flex bg-gray-600 bg-opacity-20 border border-gray-200 rounded-md">
                    <ion-icon className="py-4 p-3" name="search-outline"></ion-icon>
                    <input type="email" name="email" id="email" placeholder="Search Review" className="p-2 bg-transparent focus:outline-none"/>
                </div>

                {/* <!-- Tags --> */}
                <div className="flex flex-wrap gap-2 w-full py-2">
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Experience</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Quality</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Design</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Size</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Features</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Value</span>
                    <span className="px-2 p-1 hover:bg-blue-400 bg-gray-950 bg-opacity-30">Relplacement</span>
                </div>
                
                {/* <!-- Item Container --> */}
                <div className="flex flex-col gap-3 mt-14">
                    {
                        productReviews && productReviews?.map((review)=> (
                            <div key={review._id} className="flex flex-col gap-4 bg-gray-700 p-4">
                            {/* <!-- Profile and Rating --> */}
                            <div className="flex justify justify-between">
                                <div className="flex gap-2">
                                    <div className="w-7 h-7 text-center rounded-full bg-red-500">{review.userId.userName.charAt(0)}</div>
                                    <span>{review.userId.userName}</span>
                                </div>
                                <div className="flex p-1 gap-1 text-orange-300">
                                    {
                                        Array.from({ length: Math.floor(review.rating) }).map((_, index) => (
                                            <span key={index} className="flex items-center">
                                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-orange-300" viewBox="0 0 24 24">
                                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                                            </svg>
                                            </span>
                                        ))
                                    }
                                    {review.rating % 1 !== 0 && <ion-icon name="star-half"></ion-icon>}
                                </div>
                            </div>

                            <div>
                                {review?.feedback}
                            </div>

                            <div className="flex justify-between">
                                <span>Feb 13, 2021</span>
                                <button className="p-1 px-2 bg-gray-900 hover:bg-gray-950 border border-gray-950 bg-opacity-60">
                                    <ion-icon name="share-outline"></ion-icon> Share</button>
                            </div>
                            </div>

                        ))
                     } 

                </div>
            </div>
        </div>
    </>
  )
}

export default Review