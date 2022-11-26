import React from 'react';

const CategoryCard = ({ categoryWatch }) => {
    console.log(categoryWatch);
    const { name, picture, registered, originalPrice, resalePrice, uses, isActive } = categoryWatch;
    return (
        <div>
            <div className="card h-full bg-base-100 shadow-2xl">
                {isActive && <p>{isActive}</p>}
                <figure className="px-10 pt-10">
                    <img src={picture} alt="Shoes" className="rounded-xl" />
                </figure>
                <div className="card-body items-center text-center font-semibold">
                    <h2 className="card-title">{name}</h2>
                    <p>Original Price: {originalPrice}</p>
                    <p>Resale Price: {resalePrice}</p>
                    <p>Uses: {uses} year</p>
                    <p>registered: {registered}</p>
                    <div className="card-actions">
                        <button className="btn btn-primary">Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CategoryCard;