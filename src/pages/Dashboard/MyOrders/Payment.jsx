import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthProvider';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm ';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PK);
console.log(stripePromise);

const Payment = () => {
    const { loader } = useContext(AuthContext);

    const bookingData = useLoaderData();
    const { name, price } = bookingData;

    if (loader) {
        return <ClipLoader></ClipLoader>

    }
    return (
        <div>
            <p className='font-semibold'>Please payment <strong>${price}</strong> for <b><i>{name}</i></b></p>
            <div className='w-96 my-14'>
                <Elements stripe={stripePromise}>
                    <CheckoutForm key={bookingData._id} bookingData={bookingData} />
                </Elements>
            </div>
        </div>
    );
};

export default Payment;