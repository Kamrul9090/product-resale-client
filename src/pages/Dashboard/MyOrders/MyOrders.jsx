import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthProvider';

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
    console.log(userBookings);
    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>

        </div>
    );
};

export default MyOrders;