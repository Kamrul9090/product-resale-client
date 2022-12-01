import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthProvider';
import useAdmin from '../../hooks/useAdmin';
import Navbar from '../Shared/Navbar/Navbar';

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [isAdmin] = useAdmin(user?.email)
    return (
        <div>
            <Navbar></Navbar>
            <div className="drawer drawer-mobile mt-20">
                <input id="dashboard-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content">
                    <Outlet></Outlet>
                </div>
                <div className="drawer-side">
                    <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
                    <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                        <li><Link to='/dashboard/addProducts'>Add Products</Link></li>
                        <li><Link to='/dashboard/myProducts'>My Products</Link></li>
                        {
                            isAdmin &&
                            <>
                                <li><Link to='/dashboard/allBuyer'>All Buyer</Link></li>
                                <li><Link to='/dashboard/allSeller'>All Sellers</Link></li>
                                <li><Link to='/dashboard/users'>Users</Link></li>
                            </>
                        }
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;