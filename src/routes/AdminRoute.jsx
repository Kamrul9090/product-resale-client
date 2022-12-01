import React, { useContext, useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { ClipLoader } from 'react-spinners';
import useAdmin from '../hooks/useAdmin';

const AdminRoute = ({ children }) => {
    const { loader, user } = useContext(AuthContext);
    // console.log(user?.email);
    const [isAdmin, isAdminLoading] = useAdmin(user?.email);

    const location = useLocation();
    console.log('adminRoute', isAdmin);

    if (loader || isAdminLoading) {
        return <ClipLoader></ClipLoader>
    }

    if (user && isAdmin) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;