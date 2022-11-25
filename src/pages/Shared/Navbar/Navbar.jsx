import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/Button';
import Logo from '../../../assets/logo/wristwatch.png'
import { AuthContext } from '../../../contexts/AuthProvider';
const Navbar = () => {
    const { logout } = useContext(AuthContext);

    const handleLogout = () => {
        logout()
            .then(() => { })
            .catch(e => console.log(e))
    }
    const navItem = <>
        <li><Link to='/home'>Home</Link></li>
        <li><Link to='/Blog'>Blog</Link></li>
        <li><Link to='/myOrder'>My Order</Link></li>
        <li><Link to='/addOrder'>Add Order</Link></li>
    </>
    return (
        <div className="navbar bg-base-100 shadow-2xl p-5">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52 font-semibold">
                        {navItem}
                    </ul>
                </div>

                <div className='flex items-center text-3xl font-bold uppercase text-primary'>
                    <img className='w-10 h-10 lg:w-20 lg:h-20' src={Logo} alt="" srcset="" />
                    <h1 className='hidden lg:block'>Watches</h1>
                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal p-0 font-semibold">
                    {navItem}
                </ul>
            </div>
            <div className="navbar-end space-x-2">
                <Link to='/login'><Button>Login</Button></Link>
                <Link to='/signUp'><Button>Sign up</Button></Link>
                <button onClick={handleLogout} className='btn btn-md'>Logout</button>
            </div>
        </div>
    );
};

export default Navbar;