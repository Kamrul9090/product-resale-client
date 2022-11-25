import { createBrowserRouter } from "react-router-dom";
import ErrorRouter from "../components/ErrorRouter";
import Main from "../layout/Main";
import Blog from "../pages/Blog/Blog";
import Home from '../pages/Home/Home/Home'
import Login from "../pages/Login/Login";
import SignUp from "../pages/Login/SignUp/SignUp";
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
                path: '/signUp',
                element: <SignUp></SignUp>
            },
            {
                path: '/login',
                element: <Login></Login>
            }
        ]
    }
])