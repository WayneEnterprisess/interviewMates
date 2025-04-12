import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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
        throw new ApiError(500, "User Alread exists...");
    }

    console.log("user exists")

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
    return res.status(201).json({userCreated});
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

    //check for password
    const isPassword = await User.isPasswordCorrect(password);
    if(!isPassword){
        throw new ApiError(500, "Wrong password");
    }

    

})




export default registerUser;