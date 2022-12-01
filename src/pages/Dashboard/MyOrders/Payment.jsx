import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthProvider';

const Payment = () => {
    const { loader } = useContext(AuthContext);

    const bookingData = useLoaderData();
    console.log(bookingData);
    const { name, price } = bookingData;

    if (loader) {
        return <ClipLoader></ClipLoader>

    }
    return (
        <div>
            <p className='font-semibold'>Please payment <strong>${price}</strong> for <b><i>{name}</i></b></p>

        </div>
    );
};

export default Payment;