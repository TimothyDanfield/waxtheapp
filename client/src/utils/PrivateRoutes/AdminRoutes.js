import React, { useContext } from 'react'
import { Outlet, Navigate } from "react-router-dom"

const AdminRoutes = () => {
  const user = JSON.parse(localStorage.getItem("User"))

  return user?.role === "admin" ? (<Outlet />) : (<Navigate to="/signin" />)

}

export default AdminRoutes