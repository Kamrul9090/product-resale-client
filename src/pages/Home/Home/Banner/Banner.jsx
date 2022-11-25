import React from 'react';
import banner from '../../../../assets/banner/banner.png'
const Banner = () => {
    return (
        <div className="hero min-h-screen p-8 mt-20" style={{ backgroundImage: `url(${banner})` }}>
            <div className="hero-overlay bg-opacity-60"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md text-white">
                    <h1 className="mb-5 text-5xl font-bold">Hello Watch Lover</h1>
                    <p className="mb-5">we are collecting beautiful second-hand watches from sellers and giving the best watch to buyers that they want. We are also giving the best service to the sellers and buyers. That makes you happy. Please check our website and choose the watch that you love.</p>
                    <button className="btn btn-primary">Get Started</button>
                </div>
            </div>
        </div>
    );
};

export default Banner;