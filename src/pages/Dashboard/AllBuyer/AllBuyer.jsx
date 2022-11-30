import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { ClipLoader } from 'react-spinners';

const AllBuyer = () => {

    const { data: allBuyers = [], isLoading } = useQuery({
        queryKey: ['allBuyers'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/allBuyers`)
            const data = res.json();
            return data;
        }
    })
    console.log(allBuyers);
    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>
            <div className="overflow-x-auto">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Role</th>
                            <th>Favorite Color</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allBuyers.map((buyer, i) => <tr>
                                <th>{1 + i}</th>
                                <td>{buyer.name}</td>
                                <td>{buyer.select}</td>
                                <td><button className='btn btn-xs btn-warning'>Delete</button></td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllBuyer;