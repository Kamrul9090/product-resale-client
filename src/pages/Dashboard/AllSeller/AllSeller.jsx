import { useQuery } from '@tanstack/react-query';
import React from 'react';

const AllSeller = () => {
    const { data: allSellers = [], isLoading } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allSellers`)
            const data = res.json();
            return data;
        }
    })
    console.log(allSellers);
    return (
        <div>

        </div>
    );
};

export default AllSeller;