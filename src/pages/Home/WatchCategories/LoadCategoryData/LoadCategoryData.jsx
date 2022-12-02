import { useQuery } from '@tanstack/react-query';
import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { ClipLoader } from 'react-spinners';
import BookModal from '../../../../components/BookModal/BookModal';
import { AuthContext } from '../../../../contexts/AuthProvider';
import CategoryCard from './CategoryCard';

const LoadCategoryData = () => {
    const [categoryWatchData, setCategoryWatchData] = useState(null);
    const category = useLoaderData();
    const { user } = useContext(AuthContext);
    const { index } = category;
    const { data: watchData = [], isLoading } = useQuery({
        queryKey: ['categoryWatchData', index],
        queryFn: async () => {
            const res = await fetch(`https://resale-server-lilac.vercel.app/categoryWatchData?index=${index}&email=${user?.email}`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('accessToken')}`
                }
            });
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
                watchData.map(categoryWatch => <CategoryCard key={categoryWatch._id} categoryWatch={categoryWatch} setCategoryWatchData={setCategoryWatchData}></CategoryCard>)
            }
            <div>
                {
                    categoryWatchData &&
                    <BookModal categoryWatchData={categoryWatchData} setCategoryWatchData={setCategoryWatchData}></BookModal>
                }
            </div>
        </div>
    );
};

export default LoadCategoryData;