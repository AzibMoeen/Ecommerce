import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { FaShoppingCart } from 'react-icons/fa'; 
import CartOverlay from './CartOverlay'; 
import useFetchUser from '../../utils/useFetchUser'; 
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Separator } from './ui/separator';
import SearchBar from './Search';

const Header = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { loading } = useFetchUser();

  const handleLoginClick = () => {
    navigate('/login');
  };

  const handleLogout = async () => {
    const response = await fetch('http://localhost:8000/api/v1/users/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
      },
    });
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('accessToken');
    const data = await response.json();
    setUser(null);
    console.log(data);
  };

  const handleAdmin = () => {
    navigate('/orders');
  };

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

 
  return (
    <nav className="bg-blue-300 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <NavLink to="/" className="text-white font-bold text-2xl">
                Esparda
              </NavLink>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavLink
                  to="/"
                  className="text-white hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Home
                </NavLink>
                <DropdownMenu>
                  <DropdownMenuTrigger className="text-white hover:bg-blue-200 px-3 py-2 rounded-md text-sm font-medium">
                    Categories
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-md">
                    <DropdownMenuItem onClick={() => navigate('/tshirts')} className="hover:bg-blue-200">
                      T-Shirts
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/mugs')} className="hover:bg-blue-200">
                      Mugs
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/hoodies')} className="hover:bg-blue-200">
                      Hoodies
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <SearchBar />
            <button
              disabled={!user}
              onClick={toggleCart}
              className="mt-1"
            >
              <FaShoppingCart className="w-6 h-6 text-white" />
              <Separator orientation="horizontal" />
            </button>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <span className="text-white">Settings</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white shadow-md border border-gray-200 rounded-md">
                <DropdownMenu className="text-gray-900 font-bold">My Account</DropdownMenu>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleAdmin} className="hover:bg-gray-200">See Orders</DropdownMenuItem>
                <DropdownMenuSeparator />
                {!user ? (
                  <DropdownMenuItem onClick={handleLoginClick} className="hover:bg-gray-200">Login</DropdownMenuItem>
                ) : (
                  <DropdownMenuItem onClick={handleLogout} className="hover:bg-gray-200">Logout</DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      {isCartOpen && <CartOverlay toggleCart={toggleCart} />}
    </nav>
  );
};

export default Header;
