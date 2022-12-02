import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const AllSeller = () => {
    const { data: allSellers = [], isLoading } = useQuery({
        queryKey: ['allSellers'],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-lilac.vercel.app/allSellers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })

    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>Index</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allSellers.map((seller, i) => <tr>
                                <th>{1 + i}</th>
                                <td>{seller.name}</td>
                                <td>{seller.email}</td>
                                <td><button className='btn btn-xs btn-warning'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllSeller;