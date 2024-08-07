import React, { useEffect } from 'react';
import { useAuth } from '../../utils/AuthContext';
import { Link } from 'react-router-dom';

const Tshirts = () => {
  const { addToCart, fetchProducts, Products } = useAuth();

  useEffect(() => {
    fetchProducts(20, 1, 'Tshirts');
  }, []);

  return (
    <div className="container mx-auto py-8 bg-gray-200 min-h-screen text-gray-900">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-blue-300 mt-9 ">
      T-Shirt Wonderland: Where Style Meets Comfort
      </h1>


 <section className="product-grid mb-8 mt-16">
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
                  <p className="text-2xl font-bold text-gray-900">  {product.price}</p>
                </div>
                <button onClick={() => addToCart(product)} className="mt-4 bg-white text-blue-600 hover:bg-blue-600 hover:text-white border border-blue-600 font-bold py-2 px-4 rounded-lg w-full">
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
      
    </div>
  );
}

export default Tshirts;
