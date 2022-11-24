import React from 'react';

const Button = ({ children }) => {
    return (
        <div>
            <button className='btn sm:btn-sm lg:btn-md btn-primary'>{children}</button>
        </div>
    );
};

export default Button;