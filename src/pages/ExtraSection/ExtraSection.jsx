import React from 'react';
import extraPic from '../../assets/banner/extra.png'
const ExtraSection = () => {
    return (
        <div className="hero min-h-screen bg-base-200">
            <div className="hero-content flex-col lg:flex-row">
                <img src={extraPic} className="w-full lg:w-1/2 rounded-lg shadow-2xl" alt='' />
                <div>
                    <h1 className="text-5xl font-bold">A new watch <br />
                        New style for you!</h1>
                    <p className="py-6">To succeed you must believe. When you believe, you will succeed. I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing</p>
                </div>
            </div>
        </div>
    );
};

export default ExtraSection;