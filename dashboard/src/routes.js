import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import PrivateRoute from './components/PrivateRoute';

import { listUser } from './redux/action/UserAction';
import { listProduct } from './redux/action/productAction';
import PageOrder from './pages/PageOrder';
import { listOrders } from './redux/action/orderAction';

// ----------------------------------------------------------------------

export default function Router() {
  const dispatch =useDispatch()

  const getUser=useSelector((state)=>state.userList)
  const {users}=getUser
 console.log(getUser)
 useEffect(()=>{
  dispatch(listUser())
  dispatch(listProduct())
  dispatch(listOrders())
    

},[dispatch])
  const routes = useRoutes([
    {
      path: '/dashboard',
      element: <PrivateRoute><DashboardLayout /></PrivateRoute>,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: 'app', element: <DashboardAppPage /> },
        { path: 'user', element: <UserPage users={users} /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'order', element: <PageOrder /> },
        { path: 'blog', element: <BlogPage /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}