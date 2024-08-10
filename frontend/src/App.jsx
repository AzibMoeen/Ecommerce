import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import { AuthProvider } from '../utils/AuthContext';

// Lazy-loaded components
const Home = lazy(() => import('./components/Home'));
const Hoodies = lazy(() => import('./components/Hoodies'));
const Tshirts = lazy(() => import('./components/Tshirts'));
const Beauty = lazy(() => import('./components/Beauty'));
const Mugs = lazy(() => import('./components/Mugs'));
const Products = lazy(() => import('./components/Products'));
const CheckOutPage = lazy(() => import('./components/CheckOut'));
const Register = lazy(() => import('./components/Register'));
const Login = lazy(() => import('./components/Login'));
const SearchFeed = lazy(() => import('./components/SearchFeed'));

// Non-lazy-loaded components
import {OrderDetails} from './components/Orderdetails';
import {MyProducts} from './components/MyProducts';
import { EditProduct } from './components/EditProduct';

const App = () => {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={
              <Suspense fallback={<div>Loading Home...</div>}>
                <Home />
              </Suspense>
            } />
            <Route path="search/:search" element={
              <Suspense fallback={<div>Loading Search Feed...</div>}>
                <SearchFeed />
              </Suspense>
            } />
            <Route path="beauty" element={
              <Suspense fallback={<div>Loading Beauty...</div>}>
                <Beauty />
              </Suspense>
            } />
            <Route path="mugs" element={
              <Suspense fallback={<div>Loading Mugs...</div>}>
                <Mugs />
              </Suspense>
            } />
            <Route path="tshirts" element={
              <Suspense fallback={<div>Loading T-Shirts...</div>}>
                <Tshirts />
              </Suspense>
            } />
            <Route path="hoodies" element={
              <Suspense fallback={<div>Loading Hoodies...</div>}>
                <Hoodies />
              </Suspense>
            } />
            <Route path="products/:_id" element={
              <Suspense fallback={<div>Loading Product...</div>}>
                <Products />
              </Suspense>
            } />
            <Route path="checkout" element={
              <Suspense fallback={<div>Loading Checkout...</div>}>
                <CheckOutPage />
              </Suspense>
            } />
          </Route>
          <Route path="register" element={
            <Suspense fallback={<div>Loading Register...</div>}>
              <Register />
            </Suspense>
          } />
          <Route path="login" element={
            <Suspense fallback={<div>Loading Login...</div>}>
              <Login />
            </Suspense>
          } />
          <Route path="orders" element={<OrderDetails />} />
          <Route path="/myproducts" element={<MyProducts />} />
          <Route path="editproduct/:_id" element={<EditProduct />} />
          <Route path="*" element={<h1>Not Found</h1>} />
        </Routes>
      </AuthProvider>
    </Router>
  );
};

export default App;
