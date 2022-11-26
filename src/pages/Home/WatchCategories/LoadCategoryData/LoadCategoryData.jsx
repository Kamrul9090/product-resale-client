import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CategoryCard from './CategoryCard';

const LoadCategoryData = () => {
    const category = useLoaderData();
    const { index } = category;

    const { data: watchData = [], isLoading } = useQuery({
        queryKey: ['categoryWatchData', index],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categoryWatchData?index=${index}`);
            const data = await res.json();
            return data;
        }
    })

    if (isLoading) {
        return <ClipLoader></ClipLoader>
    }

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20'>
            {
                watchData[0]?.category.map(categoryWatch => <CategoryCard key={categoryWatch._id} categoryWatch={categoryWatch}></CategoryCard>)
            }
        </div>
    );
};

export default LoadCategoryData;