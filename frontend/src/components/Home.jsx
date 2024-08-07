import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";

const Home = () => {
  const [page, setPage] = useState("1");
  const navigate = useNavigate();
  const handleClick = (i) => {
    setPage(i + 1);
  };
  const { addToCart, fetchProducts, Products} = useAuth();

  useEffect(() => {
    fetchProducts(10, page);
    navigate('/');
  }, [page,navigate]);
 

  return (
    <div className="container mx-auto py-8 bg-gray-100 min-h-screen text-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center text-gray-900">
        Welcome to Esparda
      </h1>
      <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-blue-300 mt-16">
        Latest Arrivals
      </h2>
     <Carousel
      plugins={[Autoplay({ delay: 3000 })]}
      className="relative w-1/3 max-w-screen-lg mx-auto"
      loop
    >
      <CarouselContent>
        {Products.map((item, index) => (
          <CarouselItem key={index} className="flex flex-col items-center px-4">
            <Link to={`/products/${item._id}`} className="w-full flex flex-col items-center">
              <img
                src={item.image}
                alt={item.name}
                className="h-64 object-cover mb-4"
              />
              <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>
              <p className="text-lg font-bold text-gray-900 mb-4">${item.price}</p>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  addToCart(item);
                }}
                className="bg-blue-600 text-white hover:bg-blue-700 font-bold py-2 px-4 rounded-lg w-full"
              >
                Add to Cart
              </button>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition" />
      <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition" />
    </Carousel>
      <section className="featured-categories py-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center text-gray-900">
          Featured Categories
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Link to="/tshirts">
              <img src="/path/to/tshirt-image.jpg" alt="T-Shirts" className="w-full h-40 object-cover" />
            </Link>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-900">T-Shirts</h3>
            </div>
          </div>
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Link to="/mugs">
              <img src="/path/to/mug-image.jpg" alt="Mugs" className="w-full h-40 object-cover" />
            </Link>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-900">Mugs</h3>
            </div>
          </div>
          <div className="category-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col">
            <Link to="/hoodies">
              <img src="/path/to/hoodie-image.jpg" alt="Hoodies" className="w-full h-40 object-cover" />
            </Link>
            <div className="p-4 text-center">
              <h3 className="text-xl font-bold text-gray-900">Hoodies</h3>
            </div>
          </div>
        </div>
      </section>

      <section className="product-grid mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-14">
          {Products.map((product) => (
            <div key={product._id} className="product-card bg-white shadow-lg rounded-lg overflow-hidden flex flex-col p-4">
              <Link to={`/products/${product._id}`} className="flex-none h-48 md:h-64">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover" loading="lazy" />
              </Link>
              <div className="mt-4 flex flex-col justify-between h-full">
                <div>
                  <h4 className="text-sm text-gray-600">{product.category}</h4>
                  <h3 className="text-xl font-bold mb-2 text-gray-900">
                    <Link to={`/products/${product._id}`}>{product.name}</Link>
                  </h3>
                  <p className="text-2xl font-bold text-gray-900">${product.price}</p>
                </div>
                <button onClick={() => addToCart(product)} className="mt-4 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 font-bold py-2 px-4 rounded-lg w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="flex justify-center mt-4 space-x-2">
        {Array.from({ length: 10 }).map((_, index) => (
          <button
            key={index}
            onClick={() => handleClick(index)}
            className={`px-4 py-2 rounded-md ${page === (index + 1).toString() ? 'bg-blue-600 text-white' : 'bg-gray-300 text-gray-800 hover:bg-gray-400'}`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
