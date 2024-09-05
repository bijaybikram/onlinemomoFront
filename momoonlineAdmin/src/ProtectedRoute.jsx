import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProfile } from 'store/authSlice'

const ProtectedRoute = ({children}) => {
 const {data} = useSelector((state)=> state.auth)

 const dispatch = useDispatch()

 useEffect(()=> {
    dispatch(fetchProfile())
 },[dispatch])
 if(data.userRole !== "admin"){
    return(
        <h1>You are not authorized to view this information.</h1>
    )
 }
 return (
    <>
        {children}
    </>
 )
}

export default ProtectedRoute