import React, { useContext, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { ClipLoader } from 'react-spinners';
import useSeller from '../hooks/useSeller';

const AdminRoute = ({ children }) => {
    const { loader, user } = useContext(AuthContext);
    // console.log(user?.email);
    const [isSeller, isSellerLoading] = useSeller(user?.email);
    const [isAdmin, setIsAdmin] = useState(user?.email)
    const location = useLocation();

    if (loader || isSellerLoading) {
        return <ClipLoader></ClipLoader>
    }

    if (user && (isSeller || isAdmin)) {
        return children;
    }
    return <Navigate to='/login' state={{ from: location }} replace></Navigate>
};

export default AdminRoute;