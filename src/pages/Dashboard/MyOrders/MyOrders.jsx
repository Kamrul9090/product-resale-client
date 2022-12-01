import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthProvider';
import OrderCard from './OrderCard';

const MyOrders = () => {
    const { user } = useContext(AuthContext);

    const { data: userBookings = [], isLoading } = useQuery({
        queryKey: ["bookings", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/bookings?email=${user?.email}`)
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-5 mt-10'>
            {
                userBookings.map(booking => <OrderCard key={booking._id} booking={booking}></OrderCard>)
            }
        </div>
    );
};

export default MyOrders;