import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const {setProducts} = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/v1/users/search', {
        params: { query: searchQuery }
      });
      setProducts(response.data);
      console.log(response)
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
 

    setSearchQuery('')

    navigate(`search/:${searchQuery}`)
  };

  return (
    <div className="flex items-center bg-white rounded-md shadow-sm">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="px-4 py-2 rounded-l-md border-none focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={handleSearch}
        className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 transition duration-300"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
