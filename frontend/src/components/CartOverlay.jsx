import React from 'react';
import { FaTimes } from 'react-icons/fa';
 import { useAuth } from '../../utils/AuthContext';
 import {  useNavigate,Link } from 'react-router-dom';


const CartOverlay = ({ toggleCart }) => {
  const navigate = useNavigate()
  const { Cart ,PlusToCart ,MinusFromCart, clearCart} = useAuth();
  const total = Cart.reduce((acc,item)=>acc+item.price*item.quantity,0)


  return (
    
    <div className="fixed top-0 right-0 w-1/3 h-full bg-white shadow-lg z-50 flex flex-col">
      <div className="flex justify-end p-4 border-b">
        <button onClick={toggleCart} className="text-black">
          <FaTimes size={24} />
        </button>
      </div>
      <div className="p-4 overflow-y-auto flex-grow">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        <div className="space-y-4">
           {Cart.length === 0 ? <p>Your cart is empty</p>:<div><button onClick={clearCart}>Clear Cart</button>
           <div>Total Price : {total}</div>
           </div>}
          {Cart.map((item) => (
            <div key={item._id} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img src={item.image} alt={item.name} className="h-16 w-16 object-cover" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p> Price : {item.price}*{item.quantity} = {item.price*item.quantity}</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <button  onClick={()=>{MinusFromCart(item._id)}} className="text-black">-</button>
                <span>{item.quantity}</span>
                <button onClick={()=>{PlusToCart(item._id)}} className="text-black">+</button>
              </div>
            </div>
          ))}
      
      { Cart.length === 0 ? null:<Link to ="/checkout"> <button>CheckOut</button></Link>}
       
        </div>
      </div>
    </div>
  );
};

export default CartOverlay;
