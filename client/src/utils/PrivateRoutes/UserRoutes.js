import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'

const UserRoutes = () => {

    const getToken = () => {
        const token = JSON.parse(localStorage.getItem("Token"))
        return token ? token : ""
    }
    let auth = { "token" : getToken() }
    
  return (
    auth.token ? <Outlet /> : <Navigate to='/signin'/>
  )
}

export default UserRoutes