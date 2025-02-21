import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
// import { resetPassword } from '../../../store/authSlice'
// import { STATUSES } from '../../../globals/misc/Statuses'
import { APIAuthenticated } from '../../../http'

const ResetPassword = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {fpData} = useSelector((state) => state.auth)
    const [newPassword, setNewPassword] = useState('')
    const [confirmNewPassword, setConfirmNewPassword] = useState('')

    const newPasswordData = {
        email: fpData.fpEmail,
        newPassword: newPassword,
        confirmNewPassword: confirmNewPassword,

    }

    const handleSubmit = async(e) => {
        
        try {
            e.preventDefault()
            const response = await APIAuthenticated.post("/auth/resetPassword", newPasswordData)
            if(response.status == 200){
                navigate("/login")
            }

        } catch (error) {
            alert("Something went wrong!")
        }
        // dispatch(resetPassword(newPasswordData))
    }

    // useEffect(()=> {
    //     if(fpData.fpStatus === STATUSES.SUCCESS){
    //         navigate("/login")
    //     }
    // },[fpData.fpStatus])


  return (
    <>
          {/* <!-- component --> */}
          <div className="bg-yellow-400 h-screen overflow-hidden flex items-center justify-center">
            <div className="bg-white lg:w-5/12 md:6/12 w-10/12 shadow-3xl">
            {/* <h3>Hello</h3> */}
              <div className="bg-gray-800 absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full p-4 md:p-8">
              
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFF">
                  <path d="M0 3v18h24v-18h-24zm6.623 7.929l-4.623 5.712v-9.458l4.623 3.746zm-4.141-5.929h19.035l-9.517 7.713-9.518-7.713zm5.694 7.188l3.824 3.099 3.83-3.104 5.612 6.817h-18.779l5.513-6.812zm9.208-1.264l4.616-3.741v9.348l-4.616-5.607z"/>
                </svg>
              </div>
              <form onSubmit={handleSubmit} className="p-12 md:p-24" noValidate>
                <div className="flex flex-col items-center text-lg mb-6 md:mb-8">
                <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                  </svg>
                  <input onChange={(e) => setNewPassword(e.target.value)} type="password" id="password" name='password' className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="New Password" />
                  <p className='text-red-500 text-sm italic'></p>
                </div>
                <div className="flex flex-col items-center text-lg mb-6 md:mb-8">
                  <svg className="absolute ml-3" viewBox="0 0 24 24" width="24">
                    <path d="m18.75 9h-.75v-3c0-3.309-2.691-6-6-6s-6 2.691-6 6v3h-.75c-1.24 0-2.25 1.009-2.25 2.25v10.5c0 1.241 1.01 2.25 2.25 2.25h13.5c1.24 0 2.25-1.009 2.25-2.25v-10.5c0-1.241-1.01-2.25-2.25-2.25zm-10.75-3c0-2.206 1.794-4 4-4s4 1.794 4 4v3h-8zm5 10.722v2.278c0 .552-.447 1-1 1s-1-.448-1-1v-2.278c-.595-.347-1-.985-1-1.722 0-1.103.897-2 2-2s2 .897 2 2c0 .737-.405 1.375-1 1.722z"/>
                  </svg>
                  <input onChange={(e) => setConfirmNewPassword(e.target.value)} type="password" id="password" name='password' className="bg-gray-200 pl-12 py-2 md:py-4 focus:outline-none w-full" placeholder="Confirm New Password" />
                  <p className='text-red-500 text-sm italic'></p>
                </div>
                <button className="bg-gradient-to-b from-gray-700 to-gray-900 font-medium p-2 md:p-4 text-white uppercase w-full">Login</button>
            
              </form>
            </div>
          </div>
        </>
  )
}

export default ResetPassword