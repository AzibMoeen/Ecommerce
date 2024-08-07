import { ApiError } from "../Utils/ApiError.js";
import { ApiResponse } from "../Utils/ApiResponse.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import { Address } from "../models/address.js"
import { user } from "./user.controllers.js";





const AddAddress = asynchandler(async (req, res) => {

    const { addressLine1, fullName, addressLine2, city, state, country, postalCode, phoneNumber } = req.body;

    const id = req.user._id;

    if ([addressLine1, addressLine2, city, state, country, postalCode, phoneNumber, fullName].some((item) =>
        item.trim() === ""

    )) {
        throw new ApiError(300, "All fields are required")
    }
    //(addressLine1)

    const address = await Address.findOne({ user: id })

    if (address) {
        throw new ApiError(300, "Adress already exists")
    }

    const newaddress = await Address.create({
        user: id,
        addressLine1,
        addressLine2,
        city,
        state,
        postalCode,
        phoneNumber,
        country,
        fullName

    })
   
    res.status(200).json(new ApiResponse(200, newaddress))
})

const sendAddress = asynchandler(async (req, res) => {

    const id = req.user._id

    const address = await Address.findOne({ user: id })
    if (!address) {
        throw new ApiError("error")
    }
    console.log(address)
    //(address)
    res.status(200).json(new ApiResponse(200, address))
})

const updateAddress = asynchandler(async(req,res)=> {
    console.log(req.body)
    

    const { addressLine1, fullName, addressLine2, city, state, country, postalCode, phoneNumber,_id } = req.body;

    const address = Address.findById(_id)
    if(!address){
        throw new ApiError("Address not found")
    }


    if(addressLine1){
        user.addressLine1 = addressLine1
    }
    
    if(fullName){
        user.fullName = fullName
    }
    
    if(addressLine1){
        user.addressLine2 = addressLine2
    }
    
    if(city){
        user.city = city
    }
    
    if(state){
        user.state = state
    }
    
    if(country){
        user.country = country
    }
    
    if(postalCode){
        user.postalCode = postalCode
    }
    if(phoneNumber){
        user.phoneNumber = phoneNumber
    }

  await  user.save()




})








export { AddAddress, sendAddress, updateAddress }




