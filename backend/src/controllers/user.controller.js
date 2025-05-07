import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";


//create access and refresh tokens
const createAccessAndRefreshTokens = async (userID)=>{
    const user = await User.findById(userID)

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {accessToken,refreshToken};
}

//Register User
const registerUser= asyncHandler(async (req,res)=>{
    const {fullName, email, password, domain}=req.body;


    //check every fields
    if (!Array.isArray(domain) || domain.length === 0) {
        throw new ApiError(400, "Domains must be a non-empty array");
    }
      
    if([fullName,email,password].some((ele)=> !ele || ele.trim==="" )){
        throw new ApiError(500, "Some field is not provided");
    }

    console.log("fields checked")

    //user exists or not
    const existedUser = await User.findOne({email});
    if(existedUser) {
        throw new ApiError(499, "User Alread exists...");
    }

    console.log("user does not exists")

    //create user
    const user = await User.create({
        fullName,
        email,
        password,
        domain
    })

    console.log("user created")

    //check user created or not
    const userCreated = await User.findById(user._id).select("-password -refreshToken")
    if(!userCreated){
        throw new ApiError(500, "error while creating user");
    }

    console.log("user found")
    return res.status(200)
    .json({
        success:true,
        message:"User Signed Up",
        data:userCreated
    })
})


//User Login
const loginUser = asyncHandler(async (req,res)=>{
    const {email,password} = req.body;

    //check for fields
    if(!email || !password) {
        throw new ApiError(500, "All fields are mandatory");
    }

    //find user
    const user = await User.findOne({email});
    if(!user){
        throw new ApiError(500, "User not found");
    }
    console.log("user found")
    //check for password
    const isPassword = await user.isPasswordCorrect(password);
    if(!isPassword){
        throw new ApiError(500, "Wrong password");
    }
    console.log("password checked")

    //generate access and refresh tokens
    const {accessToken, refreshtoken}= await createAccessAndRefreshTokens(user._id); 
    
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    const options = {
        httpOnly:true,
        secure:true
    }

    return res.status(200)
    .cookie("accessToken",accessToken,options)
    .cookie("refreshtoken",refreshtoken,options)
    .json({
        success:true,
        message:"user logged in successfully",
        data:loggedInUser
    })

})



//Get user details
const getUserDetails = asyncHandler( async (req, res) => {
    // Check if user is authenticated (logged in)
    if (!req.user) {
        throw new ApiError(401, "User not logged in");
    }

    // Take user from current session using id
    const user = await User.findById(req.user._id).select("-password -refreshToken");

    if (!user) {
        throw new ApiError(404, "User Not Found");
    }

    return res.status(200)
        .json({
            success: true,
            data: user,
        });
});

const logoutUser = asyncHandler(async (req,res)=>{
    await User.findByIdAndUpdate(req.user._id,{
        $unset:{
            refreshToken:""
        }
    },{
        new:true
    })
    const options = {
        httpOnly:true,
        secure:true
    };
    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out successfully"));
})


//Upload New Photo
const uploadPhoto = asyncHandler( async (req,res)=>{
    const userId = req.user._id; // Assuming you use a middleware to attach user info to req.user

  const avatarLocalFile = req.files?.avatar?.[0]?.path;

  if (!avatarLocalFile) {
    throw new ApiError(400, "No image provided");
  }

  let newAvatar = ""

  if (avatarLocalFile) {
    const avatarUpload = await uploadOnCloudinary(avatarLocalFile);
    console.log("avatar object",avatarUpload)
    if (!avatarUpload?.url) {
      throw new ApiError(400, "Failed to upload avatar to cloudinary in url");
    }
    newAvatar = avatarUpload.url;
  }

  console.log(newAvatar)
  const updatedUser = await User.findByIdAndUpdate(
    userId,{ 
        $set:{
            avatar:newAvatar
        }
    },
    { new: true }
  ).select("-password -refreshToken");

  if (!updatedUser) {
    throw new ApiError(500, "Error updating profile photos");
  }

  
  return res.status(200).json({ updatedUser })
})

export {registerUser,loginUser,logoutUser,getUserDetails,uploadPhoto};