import { Router } from "express";
import { loginUser, registerUser, user, handlelogout } from "../controllers/user.controllers.js";
import { upload } from "../middleware/multer.js";
import { verifyJWT } from "../middleware/Auth.js";
import { addProduct, fetchProducts, fetchproduct,deleteproduct,update } from "../controllers/product.controllers.js"
import { CancelOrder, createOrder, AllShippedOrders, MakeOrderShipped, AllPendingOrders, AllOrders ,OrderByid,Sales } from "../controllers/orders.controllers.js";
import { AddAddress, sendAddress ,updateAddress } from "../controllers/address.controllers.js";
import { searchProducts } from "../controllers/searchcontroller.js";


const router = Router();

router.route('/register').post(upload.single("avatar"), registerUser)
router.route('/login').post(loginUser)
router.route('/me').get(verifyJWT, user)
router.route('/logout').post(verifyJWT, handlelogout)

//Product routes
router.route('/add').post(upload.single("image"), verifyJWT, addProduct)
router.route('/fetch').get(fetchProducts)
router.route('/fetch/:_id').get(fetchproduct)
router.route('/delete/:_id').delete(deleteproduct)
router.route('/update/:_id').put(update)



// order routes

router.route('/cancel/:_id').put(verifyJWT, CancelOrder)
router.route('/createorder').post(verifyJWT, createOrder)
router.route('/shipped').get(verifyJWT, AllShippedOrders)
router.route('/pending').get(verifyJWT, AllPendingOrders)
router.route('/MakeShipped').post(verifyJWT, MakeOrderShipped)
router.route('/orders').get(verifyJWT, AllOrders)
router.route('/orderbyid/:_id').get( OrderByid)
router.route('/sales').get(Sales)


//Address route

router.route('/addaddress').post(verifyJWT, AddAddress)
router.route('/fetchadd').get(verifyJWT, sendAddress)
router.route('/updateaddress').put(verifyJWT, updateAddress)
router.route('/search').get(searchProducts)


export default router;