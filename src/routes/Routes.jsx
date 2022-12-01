import { createBrowserRouter } from "react-router-dom";
import ErrorRouter from "../components/ErrorRouter";
import Main from "../layout/Main";
import Blog from "../pages/Blog/Blog";
import AddProducts from "../pages/Dashboard/AddProducts/AddProducts";
import AllBuyer from "../pages/Dashboard/AllBuyer/AllBuyer";
import AllSeller from "../pages/Dashboard/AllSeller/AllSeller";
import Dashboard from "../pages/Dashboard/Dashboard";
import MyOrders from "../pages/Dashboard/MyOrders/MyOrders";
import MyProducts from "../pages/Dashboard/MyProducts/MyProducts";
import Users from "../pages/Dashboard/Users/Users";
import Home from '../pages/Home/Home/Home'
import LoadCategoryData from "../pages/Home/WatchCategories/LoadCategoryData/LoadCategoryData";
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
import AdminRoute from "./AdminRoute";
import PrivateRoute from "./PrivateRoute";
import SellerRoute from './SellerRoute';
export const routers = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorRouter></ErrorRouter>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/home',
                element: <Home></Home>
            },
            {
                path: '/blog',
                element: <Blog></Blog>
            },
            {
                path: '/category/:id',
                element: <PrivateRoute><LoadCategoryData></LoadCategoryData></PrivateRoute>,
                loader: ({ params }) => fetch(`http://localhost:5000/category/${params.id}`)
            },
            {
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        children: [
            {
                path: '/dashboard/myOrders',
                element: <MyOrders></MyOrders>
            },
            {
                path: '/dashboard/addProducts',
                element: <SellerRoute><AddProducts></AddProducts></SellerRoute>
            },
            {
                path: '/dashboard/myProducts',
                element: <SellerRoute><MyProducts></MyProducts></SellerRoute>
            },
            {
                path: '/dashboard/allBuyer',
                element: <AdminRoute><AllBuyer></AllBuyer></AdminRoute>
            },
            {
                path: '/dashboard/allSeller',
                element: <AdminRoute><AllSeller></AllSeller></AdminRoute>
            },
            {
                path: '/dashboard/users',
                element: <AdminRoute><Users></Users></AdminRoute>
            },
        ]
    }

])