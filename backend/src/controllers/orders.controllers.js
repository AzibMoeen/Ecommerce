import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import { Order } from "../models/orders.js";
import { Product } from "../models/products.js";
import { User } from "../models/user.js";
import { Address } from "../models/address.js";

const createOrder = asynchandler(async (req, res) => {
    const user = req.user._id
    if (!user) {
        throw new ApiError(401, "User not found")
    }

    const { products } = req.body
    let totalAmount = 0
    const order = []
    const address = await Address.findOne({user})
    const id = address._id
    //("this",address)
    for (const item of products) {

        const product = await Product.findById(item._id).populate('seller')
      
        if (!product) {
            throw new ApiError(401, "error22")
        }
        if (product.stock < item.quantity) {
            throw new ApiError(401, "error22")
        }
        product.stock -= item.quantity
        await product.save({ validateBeforeSave: false })
        totalAmount += product.price * item.quantity
        order.push({
            product: product._id,
            quantity: item.quantity,
            seller: product.seller?._id,
        })
    }
    const CreatedOrder = await Order.create({
        user,
        products: order,
        totalAmount,
        address: id
    })
    //(CreatedOrder)
    return res.status(201).json(new ApiResponse(201, CreatedOrder, "Order created successfully"));
})
const CancelOrder = asynchandler(async (req, res) => {
    const { orderid } = req.params;
    const order = Order.findByIdAndUpdate(orderid, { status: 'Cancelled' }, { new: true })
    if (!order) {
        throw new ApiError(402, "order not found")
    }
})

const AllPendingOrders = asynchandler(async (req, res) => {

    const id = req.user._id
    Admin = await User.findById(id)
    if (!Admin.isAdmin) {
        throw new ApiError(400, "You are not a admin")
    }
    const status = "Pending"
    const allorders = await Order.find({ status })
    if(!allorders){
        throw new ApiError(400,"No orders found")

    }
    res.status(200).json(new ApiResponse(200, allorders))   
})

const MakeOrderShipped = asynchandler(async (req, res) => {

    const _id = req.params
    if (!_id) {
        throw new ApiError(492)
    }
    const order = await Order.findById(_id)

    if (!order) {
        throw new ApiError(402)
    }
    order.status = "Shipped"

    order.save({ validateBeforeSave: false })
})

const AllShippedOrders = asynchandler(async (req, res) => {
    const id = req.user._id
    Admin = await User.findById(id)
    if (!Admin.isAdmin) {
        throw new ApiError(400, "You are not a admin")
    }
    const status = "Shipped"
    const allorders = await Order.find({ status })

    if (!allorders) {
        throw new ApiError(300)
    }

    res.status(200).json(new ApiResponse(200, allorders))
})

const AllOrders = asynchandler(async (req, res) => {
    const id = req.user._id
     const Admin = await User.findById(id)
    if (!Admin.isAdmin) {
        throw new ApiError(400, "You are not a admin")
    }
    const allorders = await Order.find({}).populate('user', 'fullname email')
    //(allorders)

    if (!allorders) {
        throw new ApiError(300)
    }

    res.status(200).json(new ApiResponse(200, allorders))
})

const OrderByid = asynchandler(async (req, res) => {
    const id = req.params._id
    //(id)
    if (!id) {
        throw new ApiError(492)
    }
    const order = await
        Order.findById(id).populate('user', 'fullname email').populate('products.product', 'name price').populate('address')
        
    if (!order) {
        throw new ApiError(402)
    }
    //(order)
    res.status(200).json(new ApiResponse(200, order))
})

const Sales = asynchandler(async(req,res)=>{

    const sales = await Order.aggregate([
        { $match: { status: "Delivered" } }, 
        { $group: { _id: null, totalAmount: { $sum: "$totalAmount" } } }  
      ]);
      if(!sales){
            throw new ApiError(302,"No sales found")
      }
      //(sales)
      res.status(200).json(new ApiResponse(200,sales))
})




export { CancelOrder, createOrder, AllShippedOrders, MakeOrderShipped, AllPendingOrders, AllOrders,OrderByid ,Sales}

