import React, { useState } from 'react';
import { HiCheck } from "react-icons/hi";
const CategoryCard = ({ categoryWatch, setCategoryWatchData }) => {
    // const [open, setOpen] = useState(true);
    const { name, picture, registered, originalPrice, resalePrice, uses, isActive, sellerName, location } = categoryWatch;
    return (
        <div>
            <div className="card h-full bg-base-100 shadow-2xl">
                {isActive && <p className='flex items-center font-bold'><HiCheck className='text-blue-500 text-2xl'></HiCheck>{sellerName}</p>}
                <figure className="px-10 pt-10">
                    <img src={picture} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center font-semibold">
                    <h2 className="card-title">{name}</h2>
                    <p>Original Price: {originalPrice}</p>
                    <p>Resale Price: {resalePrice}</p>
                    <p>Uses: {uses} year</p>
                    <p>registered: {registered}</p>
                    <p>Location: {location}</p>
                    <div className="card-actions">
                        <label onClick={() => setCategoryWatchData(categoryWatch)} htmlFor="watchBooing" className="btn">Booking Watch</label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;