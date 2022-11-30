import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthProvider';
import { ClipLoader } from 'react-spinners';

const PrivateRoute = ({ children }) => {
    const { loader, user } = useContext(AuthContext);

    const location = useLocation();

    if (loader) {
        return <ClipLoader></ClipLoader>
    }

    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace></Navigate>
    } else {
        return children;
    }
};

export default PrivateRoute;