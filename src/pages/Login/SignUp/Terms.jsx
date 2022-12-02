import React from 'react';
import { Link } from 'react-router-dom';

const Terms = () => {
    return (
        <div>
            <ul>
                <li>I am accept all terms and conditions</li>
                <Link to='/signUp'><small className='font-bold hover:underline'>Go Back</small></Link>
            </ul>
        </div>
    );
};

export default Terms;