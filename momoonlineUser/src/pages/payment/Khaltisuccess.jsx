import React, { useEffect, useState } from 'react'
import { APIAuthenticated } from '../../http'
import Loader from '../../globals/components/loading/Loader'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { emptyCart } from '../../store/cartSlice'

const Khaltisuccess = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const queryParams = new URLSearchParams(location.search)
    const pidx = queryParams.get("pidx")
    const [loading, setLoading ] = useState(true)


    const verifyPidx = async () => {
        // console.log("Vayo ta?")
        try {
            const response = await APIAuthenticated.post("/payment/verifypidx", {pidx})
            // console.log(response)
            if(response.status === 200){
                setLoading(false)
                dispatch(emptyCart())
                // alert(response.data.message)
                navigate("/")
                // window.location.href = "/"
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        verifyPidx()
    },[pidx])

    if(loading){
        return (
            <Loader status= "Verifying..."/>
        )
    }else{
        return(
            <Loader status="Verified"/>

        )
    }
}

export default Khaltisuccess