import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";


export const verifyJWT = asyncHandler( async (req,res,next)=>{
    try {
        let token;
        if(req.cookies?.accessToken){
            token = req.cookies.accessToken
        }else if(req.headers.authorization?.startsWith("Bearer ")){
            token = req.headers.authorization.split(" ")[1];

        }

        if (!token) {
            throw new ApiError(401, "Access token is missing");
        }

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