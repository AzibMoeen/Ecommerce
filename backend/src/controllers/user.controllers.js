import { ApiError } from "../Utils/ApiError.js";
import { asynchandler } from "../Utils/asycnhandler.js";
import { User } from "../models/user.js";
import { uploadOnCloudinary } from "../Utils/cloudinary.js";
import { ApiResponse } from "../Utils/ApiResponse.js";


const getRefreshAndAccessToken = async (userid) => {

  const user = await User.findById(userid)
  if (!user) {
    throw new ApiError(402, "No user found")
  }
  const refreshToken = await user.generateRefreshToken()
  const accessToken = await user.generateAccessToken()

  user.refreshToken = refreshToken

  await user.save({ validateBeforeSave: false })
  return { refreshToken, accessToken }
}

const registerUser = asynchandler(async (req, res) => {
  const { email, password, fullname, username } = req.body;


  if ([email, password, fullname, username].some((item) => item?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }


  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  const avatarlocalpath = req.file?.path;
  if (!avatarlocalpath) {
    throw new ApiError(401, "Avatar is required");
  }


  let avatar;
  try {
    avatar = await uploadOnCloudinary(avatarlocalpath);
    if (!avatar?.url) {
      throw new Error("Failed to upload avatar to Cloudinary");
    }
  } catch (error) {
    throw new ApiError(500, "Failed to upload avatar: " + error.message);
  }


  const newUser = await User.create({
    username,
    fullname,
    avatar: avatar.url,
    email,
    password,
  });


  const createdUser = await User.findById(newUser._id).select("-password -refreshToken");

  if (!createdUser) {
    throw new ApiError(500, "Failed to retrieve created user");
  }

  return res.status(200).json(new ApiResponse(200, createdUser))
});

const loginUser = asynchandler(async (req, res) => {
  const { email, password } = req.body;


  if (!(email || password)) {
    throw new ApiError(400, 'Email and password are required');
  }


  const user = await User.findOne({ email });


  if (!user) {
    throw new ApiError(401, 'Invalid email or password');
  }


  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new ApiError(402, "Password is incorrect")
  }
  const { refreshToken, accessToken } = await getRefreshAndAccessToken(user._id)

  const loggedin = await User.findById(user._id).select("-password -refreshToken");


  const options = {
    httpOnly: true,
    secure: true,
  }


  return res.status(200).cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, {
      user: loggedin,
      refreshToken,
      accessToken
    }, "User logged in successfully"));
});

const makeAdmin = asynchandler(async (req, res) => {

  const id = req.user._id
  const user = User.findByIdAndUpdate(id,
    { isAdmin: !isAdmin }, { new: true }
  )
  if (!user) {
    throw new ApiError(401, 'Internal server error');
  }
})
//check if user is loggedin and give details in response
const user = asynchandler(async (req, res) => {

  const userdata = await User.findById(req.user._id).select("-password")

  if (!user) {
    throw new ApiError(402, "user not found")
  }
  res.json(new ApiResponse(200, userdata))

})
const handlelogout = asynchandler(async (req, res) => {
  const user = await User.findById(req.user._id)
  if (!user) {
    throw new ApiError(402, "No user found")
  }
  user.refreshToken = ""
  await user.save({ validateBeforeSave: false })
  res.clearCookie("accessToken")
  res.clearCookie("refreshToken")
  res.json(new ApiResponse(200, "User logged out successfully"))
}
)



export { registerUser, loginUser, makeAdmin, user, handlelogout };

