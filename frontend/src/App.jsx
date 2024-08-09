import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Layout from './Layout';
import Hoodies from './components/Hoodies';
import Tshirts from './components/Tshirts';
import Beauty from './components/Beauty';
import Mugs from './components/Mugs';
import Home from './components/Home';
import Products from './components/Products';
import Register from './components/Register';
import Login from './components/Login';
import CheckOutPage from './components/CheckOut';
import { AuthProvider } from '../utils/AuthContext';
import { OrderDetails } from './components/Orderdetails';
import SearchFeed from './components/SearchFeed';
import { MyProducts } from './components/MyProducts';
import { EditProduct } from './components/EditProduct';


const App = () => {
     
  return (
    <Router>
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home /> } />
          <Route path = "search/:search" element = {<SearchFeed  />}/>
          <Route path="beauty" element={<Beauty />} />
          <Route path="mugs" element={<Mugs/>} />
          <Route path="tshirts" element={<Tshirts />} />
          <Route path="hoodies" element={<Hoodies />} />
          <Route path = "products/:_id" element = {<Products  />}/>
           <Route path = "checkout" element = {<CheckOutPage  />}/>
          </Route>
         <Route path="register" element={<Register  />} />
         <Route path="login" element={<Login/>} />  

         <Route path="orders" element={<OrderDetails/>} />
         <Route path="/myproducts" element={<MyProducts/>} />
         <Route path="editproduct/:_id" element={<EditProduct/>} />

         <Route path="*" element={<h1>Not Found</h1>} />
      </Routes>
   </AuthProvider>
    </Router>
  );
};

export default App;
