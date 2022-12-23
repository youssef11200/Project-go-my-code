import { BrowserRouter,/*  Routes,Route */ } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
// routes
import Router from './routes';
// theme

import ThemeProvider from './theme';
// components
import ScrollToTop from './components/scroll-to-top';
import { StyledChart } from './components/chart';
/* import LoginPage from './pages/LoginPage';
import DashboardLayout from './layouts/dashboard/DashboardLayout';
import PrivateRoute from './components/PrivateRoute';
import DashboardAppPage from './pages/DashboardAppPage';
import UserPage from './pages/UserPage';
import ProductsPage from './pages/ProductsPage'; */



// ----------------------------------------------------------------------

export default function App() {
  return (
    <HelmetProvider>
    <BrowserRouter>
    <ThemeProvider>
      <ScrollToTop />
      <StyledChart />
      <Router />
      {/* <Routes>
        <Route path= 'login' element ={<LoginPage />}/>
        <Route path= '/' element ={<PrivateRoute >
          <DashboardLayout />
        </PrivateRoute>}/>
        <Route path= '/app' element ={<PrivateRoute >
          <DashboardAppPage/>
        </PrivateRoute>}/>
        <Route path= '/user' element ={<PrivateRoute >
          <UserPage /> 
        </PrivateRoute>}/>
        <Route path= '/products' element ={<PrivateRoute >
          <ProductsPage /> 
        </PrivateRoute>}/>
        
      </Routes> */}
    </ThemeProvider>
    </BrowserRouter>
    </HelmetProvider>
  );
}
