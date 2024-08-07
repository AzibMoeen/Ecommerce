
import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const UserSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  username:{
    type: String,
    required : true,
    unique:true,
  },
  refreshToken:{
    type:String
  },
  avatar:{
   required:true,
   type:String
  }
   
},{timestamps:true});

UserSchema.pre("save", async function(next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});




UserSchema.methods.isPasswordCorrect = async function(password){
     
 return await bcrypt.compare(password,this.password)
}

UserSchema.methods.generateAccessToken = function (){
    return jwt.sign(
         {
             _id: this._id,
             email : this.email,
             username:this.username,
             fullname:this.username,
         },
         process.env.ACCESS_TOKEN_SECRET,
         {
             expiresIn:process.env.ACCESS_TOKEN_EXPIRY
         }
     )
 
 }
 UserSchema.methods.generateRefreshToken = function (){
     return jwt.sign(
         {
             _id: this._id,
         },
         process.env.REFRESH_TOKEN_SECTER,
         {
             expiresIn:process.env.REFRESH_TOKEN_EXPIRY
         }
     )
 }



 export const User = mongoose.model('User', UserSchema);

