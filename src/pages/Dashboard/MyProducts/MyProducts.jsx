import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { ClipLoader } from 'react-spinners';
import ProductTable from './ProductTable';
import { AuthContext } from '../../../contexts/AuthProvider';

const MyProducts = () => {
    const { user } = useContext(AuthContext)
    const { email } = user;
    const { data: allSellerProducts = [], isLoading, refetch } = useQuery({
        queryKey: ["products", email],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/products?email${email}`)
            const data = await res.json();
            return data;
        }
    })

    const handleDeleteProduct = product => {
        console.log(product._id);
        fetch(`http://localhost:5000/products/${product._id}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged) {
                    refetch()
                }
            })
    }
    // console.log(allSellerProducts);
    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }
    return (
        <div>
            <ProductTable handleDeleteProduct={handleDeleteProduct} allSellerProducts={allSellerProducts}></ProductTable>
        </div>
    );
};

export default MyProducts;