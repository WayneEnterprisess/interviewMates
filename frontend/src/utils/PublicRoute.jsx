import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom';

const PublicRoute = ({children}) => {

    const isAuthenticated = useSelector((state=>state.auth.isAuthenticated))
    console.log("in public route",isAuthenticated)
    if (isAuthenticated) {
        return <Navigate to="/userprofile" replace />;
    }

    return children;

}

export default PublicRoute
