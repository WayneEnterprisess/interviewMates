import mongoose from "mongoose";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";


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


export default registerUser;