import { ApiError } from "../Utils/ApiError.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

export const verifyJWT = asynchandler(async (req, _, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      throw new ApiError(401, "Unauthorized Access");
    }

    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decodedToken?._id).select("-password -refreshToken").lean(); 

    if (!user) {
      throw new ApiError(401, "No user found");
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Token verification error: ", error); 
    throw new ApiError(500, "Something bad happened");
  }
});
