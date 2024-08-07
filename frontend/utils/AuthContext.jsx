
import { createContext, useState, useEffect, useContext } from "react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast  } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import { Bounce } from 'react-toastify';
import axios from "axios";




const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [Products, setProducts] = useState([])
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState("");
    const navigate = useNavigate();
    const [Cart, setCart] = useState(localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [])  
    useEffect(() => { localStorage.setItem('cart', JSON.stringify(Cart)) 
     }
   , [Cart])
    
    const removeProductFromCart = (product) =>{
      setCart((prevCart)=>prevCart.filter((item)=>item._id!==product._id));
    }
    const addToCart = (product) => {

      setCart((prevstate) => {
        const existingProduct = prevstate.find((item) => item._id === product._id);
      
    
        if (existingProduct) {
          return prevstate.map((item) =>
            item._id === product._id
              ? { ...item, quantity: item.quantity + 1 }
              : item,
          );
        } else {
          return [...prevstate, { ...product, quantity: 1 }];
        }
      });
    };
    const PlusToCart = (productId) => {
      setCart((prevCart) => {
        return prevCart.map((item) =>
          item._id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      });
    };
    const MinusFromCart = (productId) => {
      setCart((prevCart) => {
        const product = prevCart.find((item) => item._id === productId);
        if (product.quantity === 1) {
          return prevCart.filter((item) => item._id !== productId);
        } else {
          return prevCart.map((item) =>
            item._id === productId ? { ...item, quantity: item.quantity - 1 } : item
          );
        }
      });
    };

    const clearCart = () => {
      setCart([]);
    }

    const handleUserLogin = async (e, credentials) => {
        e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/api/v1/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      localStorage.setItem('refreshToken', data.data.refreshToken)
      localStorage.setItem('accessToken', data.data.accessToken)
      setUser(data.data);
      toast('You have been loggedin', {
        position: "top-right",
        autoClose: 800,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        type: "success",
        transition: Bounce,
        });
        navigate('/')
      
    } catch (error) {
      console.error('Network error', error);
    }
    };
   
    const handleRegister = async (e, credentials) => {
        e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('username', credentials.username);
      formDataToSend.append('email', credentials.email);
      formDataToSend.append('avatar', credentials.avatar);
      formDataToSend.append('fullname', credentials.fullname);
      formDataToSend.append('password', credentials.password);

      const response = await fetch('http://localhost:8000/api/v1/users/register', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json() 

      await new Promise((resolve)=>setTimeout(resolve,2000))
      navigate('/login')
    } catch (error) {
      console.error('Network error', error);
    }
    };

    const fetchProducts = async (limit, page,Category) => {
      try {
        const response = await axios.get('http://localhost:8000/api/v1/users/fetch', {
          params: {
            limit,
            page,
            Category:Category
          },
        });
        console.log(response.data)
        setProducts(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

   
    const contextData = {
        user,
        Cart,
        handleUserLogin,
        handleRegister,
        setUser,
        MinusFromCart,
        PlusToCart,
        addToCart,
        removeProductFromCart,
        clearCart,
        setCart,
        fetchProducts,
        Products,
        setProducts
      
       
         
    };

    return (
        <AuthContext.Provider value={contextData}>
            {!loading ? <p>Loading...</p> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthContext;
