import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { Link } from 'react-router-dom';
import categoriesImg from '../../../assets/img/categories.png'
import Category from './Category';


const WatchCategories = () => {

    const { data: categories = [], isLoading } = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await fetch(`http://localhost:5000/categories`);
            const data = await res.json();
            return data;
        }
    })
    return (
        <div>
            <div className='my-20 bg-slate-400 p-14'>
                <h1 className='uppercase text-xl lg:text-4xl text-secondary font-bold text-center mb-10'>Watch Categories</h1>
                <img className='rounded-3xl h-52 w-full' src={categoriesImg} alt="" srcset="" />
            </div>
            <div>
                <h1 className='text-xl lg:text-3xl font-bold mb-10'>Select your Category</h1>
                <div className='flex flex-col items-center gap-10 mb-10 lg:flex-row justify-around'>
                    {
                        categories.map(category =>
                            <Category key={category._id} category={category}></Category>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WatchCategories;