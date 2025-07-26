import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({user}) => {

    if (!user || user.email !== 'arikxl@gmail.com') {
        return <Navigate to="/" replace/>
    }

  return (
    <div>ProtectedRoute</div>
  )
}

export default ProtectedRoute