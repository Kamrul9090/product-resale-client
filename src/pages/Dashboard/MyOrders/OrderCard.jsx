import React from 'react';
import { Link } from 'react-router-dom';

const OrderCard = ({ booking }) => {
    const { name, image, price, _id } = booking;
    return (
        <div className="card w-96 h-full bg-base-100 shadow-2xl">
            <figure className="px-10 pt-10">
                <img src={image} alt="Shoes" className="rounded-xl" />
            </figure>
            <div className="card-body items-center text-center">
                <h2 className="card-title">{name}</h2>
                <p className='font-semibold'>Price: ${price}</p>
                <div className="card-actions">
                    {
                        price && !booking?.paid &&
                        <Link to={`/dashboard/payment/${_id}`}><button className="btn btn-primary">Pay Now</button></Link>
                    }
                    {
                        price && booking?.paid && <span className='font-semibold text-orange-700'>paid done</span>
                    }
                </div>
            </div>
        </div>
    );
};

export default OrderCard;