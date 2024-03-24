import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const SignedInRoutes = () => {

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem("Token"))
        return token ? token : ""
    }
    let auth = { "token" : getToken() }
    
  return (
    auth.token ? <Navigate to='/'/> : <Outlet />
  )
}

export default SignedInRoutes