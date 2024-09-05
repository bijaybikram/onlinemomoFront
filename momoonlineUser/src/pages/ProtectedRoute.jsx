import React from 'react'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({children}) => {
 const {data} = useSelector((state)=> state.auth)
 console.log(data)
 if(data.userRole != "admin"){
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