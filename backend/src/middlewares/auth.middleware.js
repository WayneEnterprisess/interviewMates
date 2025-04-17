import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const veriftJWT = asyncHandler( async (req,res,next)=>{
    try {
        if(!req.cookies?.accessToken){
            throw new ApiError(401,"access token is missing");
        }
        const token = req.cookies.accessToken
        const verifyToken = jwt.verify(token,process.env.ACCESS_TOKEN_SECRET)
        if(!verifyToken){
            throw new ApiError(401, "user not authorized");
        }

        const user = await User.findById(verifyToken._id).select("-password")
        if(!user){
            throw new ApiError(401, "user not verified");
        }
        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(500,"error in authorization block")
    }
})