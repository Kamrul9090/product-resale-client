import { useQuery } from '@tanstack/react-query';
import React from 'react';
import toast from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';

const AllBuyer = () => {

    const { data: allBuyers = [], isLoading, refetch } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-lilac.vercel.app/allBuyers`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            })
            const data = res.json();
            return data;
        }
    })
    const handleDelete = (buyer) => {
        fetch(`https://resale-server-lilac.vercel.app/users/${buyer._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount > 0) {
                    toast.success('Delete success');
                    refetch()
                }
            })
    }
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
                            allBuyers.length > 0 ?
                                allBuyers.map((buyer, i) => <tr>
                                    <th>{1 + i}</th>
                                    <td>{buyer.name}</td>
                                    <td>{buyer.email}</td>
                                    <td><button onClick={() => handleDelete(buyer)} className='btn btn-xs btn-warning'>Delete</button></td>
                                </tr>)
                                :
                                <h1>No Buyer register yet!!!</h1>
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;