import { data } from 'autoprefixer';
import React from 'react';
import { Link, useRouteError } from 'react-router-dom';
import img from '../assets/error/browser.png'
const ErrorRouter = () => {
    const error = useRouteError()
    console.log(error);
    return (
        <div className='flex flex-col w-1/2 mx-auto text-center items-center mt-32 space-y-5'>
            <h1 className='text-6xl w-32 font-bold text-red-700'>{error?.status || error?.statusText}</h1>
            <img className='w-32' src={img} alt="" srcset="" />
            <p className='font-semibold'><span className='text-red-500'>Please go back...</span><Link className='text-primary underline' to='/'>HOME</Link></p>
        </div>
    );
};

export default ErrorRouter;