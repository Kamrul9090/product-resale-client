import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../contexts/AuthProvider';

const AdvertiseProducts = () => {
    const { user } = useContext(AuthContext)
    const { data: advertiseProducts = [], isLoading } = useQuery({
        queryKey: ["advertiseProducts", user?.email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/advertiseProducts?email=${user?.email}`);
            const data = await res.json();
            return data;
        }
    })
    console.log(advertiseProducts);
    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
            {
                advertiseProducts.map(product => <div className="card w-96 bg-base-100 shadow-xl">
                    <figure className="px-10 pt-10">
                        <img src={product.image} alt="Shoes" className="rounded-xl" />
                    </figure>
                    <div className="card-body items-center text-center">
                        <h2 className="card-title">{product.name}</h2>
                        <p>Price: ${product.price}</p>
                        <div className="card-actions">
                            <button className="btn btn-primary">Buy Now</button>
                        </div>
                    </div>
                </div>)
            }
        </div>
    );
};

export default AdvertiseProducts;