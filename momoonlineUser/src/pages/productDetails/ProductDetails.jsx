import React from 'react'
import SingleProduct from './product/SingleProduct'
import Review from './review/Review'
import { useParams } from 'react-router-dom'

const ProductDetails = () => {

    const {id} = useParams()
    window.scrollTo(0, 0);
    // console.log(id)

  return (
    <div>
        <SingleProduct id = {id}/>
        <Review id = {id}/>
    </div>
  )
}

export default ProductDetails