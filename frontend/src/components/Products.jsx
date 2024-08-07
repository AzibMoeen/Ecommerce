import React, {useEffect,useState}from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../utils/AuthContext';


const Products = () => {

    const [newProduct, setNewProduct] = useState({});
    const { _id } = useParams();
    const fetchProduct = async () => {
        try {
          const response = await fetch(`http://localhost:8000/api/v1/users/fetch/${_id}`);
          const data = await response.json();
          console.log(data);
          setNewProduct(data.data);
        } catch (error) {
          console.error('Error fetching products:', error);
        
        }
    }
    const cartItem = { ...newProduct, quantity: 1 };  
    const Cart = [];  
    Cart.push(cartItem)
    useEffect(() => {
     fetchProduct();
    }, [_id]);
    const handleClick = async () => {
        Cart.map((item)=>{
           if(item.quantity>item.stock){
               alert('Stock is not available')
               return
           }
        })  
           const res = await fetch('http://localhost:8000/api/v1/users/createorder',{
               method:'POST',
               headers:{
                   'Content-Type':'application/json',
                    'Authorization':`Bearer ${localStorage.getItem('accessToken')}`
               },
               body:JSON.stringify({products:Cart}),
           }
           )
           const data = await res.json()
           console.log(data)
           
           
           }

    
 
  const { addToCart } = useAuth();
    

  return (
    <div className="bg-gray-100 dark:bg-gray-800 py-8">
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row -mx-4">
            <div className="md:flex-1 px-4">
                <div className="h-[460px] rounded-lg bg-gray-300 dark:bg-gray-700 mb-4">
                    <img className="w-full h-full object-cover" src={newProduct.image} alt="Product Image"/>
                </div>
                <div className="flex -mx-2 mb-4">
                    <div className="w-1/2 px-2">
                        <button onClick={()=>{addToCart(newProduct)}} className="w-full bg-gray-900 dark:bg-gray-600 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800 dark:hover:bg-gray-700">Add to Cart</button>
                    </div>
                    <div className="w-1/2 px-2">
                        <button onClick={handleClick} className="w-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white py-2 px-4 rounded-full font-bold hover:bg-gray-300 dark:hover:bg-gray-600">Buy Now</button>
                    </div>
                </div>
            </div>
            <div className="md:flex-1 px-4">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">{newProduct.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                    {newProduct.discription}
                </p>
                <div className="flex mb-4">
                    <div className="mr-4">
                        <span className="font-bold text-gray-700 dark:text-gray-300">Price:</span>
                        <span className="text-gray-600 dark:text-gray-300">{newProduct.price}</span>
                    </div>
                    <div>
                        <span className="font-bold text-gray-700 dark:text-gray-300">Availability: </span>
                        <span className="text-gray-600 dark:text-gray-300">{newProduct.stock}</span>
                    </div>
                </div>
              
            
                <div>
                    <span className="font-bold text-gray-700 dark:text-gray-300">Product Description:</span>
                    <p className="text-gray-600 dark:text-gray-300 text-sm mt-2">
                        {newProduct.description}
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

    
  );
};

export default Products;
