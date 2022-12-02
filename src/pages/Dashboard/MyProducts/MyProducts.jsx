import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import ProductTable from './ProductTable';
import { AuthContext } from '../../../contexts/AuthProvider';
import toast from 'react-hot-toast';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { email } = user;
    const { data: allSellerProducts = [], isLoading, refetch } = useQuery({
        queryKey: ["products", email],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-lilac.vercel.app/products?email=${email}`)
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteProduct = product => {
        console.log(product._id);
        fetch(`https://resale-server-lilac.vercel.app/products/${product._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                }
            })
    }

    const advertisedProduct = product => {
        fetch(`https://resale-server-lilac.vercel.app/products/${product._id}`, {
            method: 'PUT',
        })
            .then(res => res.json())
            .then(data => {
                if (data.modifiedCount > 0) {
                    toast.success('This Product added on home page');
                }
            })
    }
    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>
            <ProductTable advertisedProduct={advertisedProduct} handleDeleteProduct={handleDeleteProduct} allSellerProducts={allSellerProducts}></ProductTable>
        </div>
    );
};

export default MyProducts;