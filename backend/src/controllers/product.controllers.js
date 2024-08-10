import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { Product } from "../models/products.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import { isValidObjectId } from "mongoose";


const fetchProducts = async (req, res) => {
  try {
    const { limit, page, Category } = req.query;
    const intLimit = parseInt(limit) || 10;
    const intPage = parseInt(page) || 1;

    //(Category);
    
    let products;

    if (Category) {
     products = await Product.aggregate([
        { $match: { Category: Category } },
        { $skip: (intPage - 1) * intLimit },
        { $limit: intLimit }
      ]);
    } else {
      products = await Product.find().skip((intPage - 1) * intLimit).limit(intLimit);
      //(products)
    }

    if (!products.length) {
      throw new ApiError(404, "No products found");
    }
    
    res.status(200).json(new ApiResponse(200, products));
    
  } catch (error) {
    res.status(error.statusCode || 500).json(new ApiError(error.statusCode || 500, error.message));
  }
};

  

 



const addProduct = asynchandler(async(req,res)=>{

  const {name,stock,description,price,category} = req.body;
  const seller =   req.user._id
  if(!seller){
    throw new ApiError(402,"User is not Authorized to Add products")
  }

  if( [name,stock,description,price,category].some((items)=>
    items.trim()===""
   ) ){
    throw new ApiError(402,"All fields are required")
   }
 
   const imageLocalPath = req.file?.path
   if(!imageLocalPath){
    throw new ApiError(402,"Image is required")
   }
    
   const image = await uploadOnCloudinary(imageLocalPath)
   if(!image){
    throw new ApiError(402,"Image is required")

   }
   const product =  await Product.create({
    name,
    stock,
    seller,
    description,
    price,
    image : image.url,
    Category:category
   })

   const createdProduct = await Product.findById(product._id)
   if (!createdProduct) {
    throw new ApiError(500, "Failed to retrieve created user");
  }
 
  return res.status(201).json({
    status: "success",
    message: "Product Added successfully",
    data: createdProduct,
  });
});


const AllProductsofSeller = asynchandler(async(req,res)=>{
   const seller = req.params._id

   const products = Product.find({seller})

   if(!products){
    throw new ApiError(401,"No products found")
   }
   return res.status(200).json(new ApiResponse(200,products,"Success"))
})


const fetchproduct = asynchandler(async(req,res)=>{
  const id = req.params._id
  
 
  const product = await Product.findById(id)
  if(!product){
    throw new ApiError(401,"Product not found")
  }
  return res.status(200).json(new ApiResponse(200,product))
})

const deleteproduct = asynchandler(async(req,res)=>{
   
  const id = req.params._id
  //(id)
  console.log(id)
  const deleteProduct = await Product.findByIdAndDelete(id)
  console.log(deleteProduct)
  if(!deleteProduct){
   throw new ApiError(401,"Invalid id");
  }

  return res.status(200).json(new ApiResponse(200,"Deleted successfully"))
})

const update = asynchandler(async(req,res)=>{
  const id = req.params._id
  const {name,stock,description,price,category} = req.body

  if( [name,stock,description,price,category].some((items)=>
    items ===""
   ) ){
    throw new ApiError(402,"All fields are required")
   }
  const product = await Product.findById(id)
  if(!product){
    throw new ApiError(401,"Product not found")
  }
  if(name){
    product.name = name
  }
  if(stock){
    product.stock = stock
  }
  if(description){
    product.description = description
  }
  if(price){
    product.price = price
  }

  await product.save()
  return res.status(200).json(new ApiResponse(200,product))
})


const fetchMug = asynchandler(async(req,res)=>{

  const Mug = await Product.findOne({Category:"Mugs"})


return res.status(200).json(new ApiResponse(200,Mug))
})
const fetchHoodie = asynchandler(async(req,res)=>{

  const Hoodie= await Product.findOne({Category:"Hoodies"})


return res.status(200).json(new ApiResponse(200,Hoodie))
})
const fetchTshirt = asynchandler(async(req,res)=>{

  const Tshirt = await Product.findOne({Category:"Tshirts"})


return res.status(200).json(new ApiResponse(200,Tshirt))
})


export {addProduct,AllProductsofSeller,deleteproduct,fetchProducts,fetchproduct,update,fetchMug,fetchHoodie,fetchTshirt}




                                