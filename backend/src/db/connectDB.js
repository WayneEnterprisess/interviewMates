import mongoose from "mongoose";
import express from 'express';
import { DB_NAME } from "../constants.js";



const connectDB = async ()=>{
    try {
        if(!process.env.MONGODB_URI){
            throw new Error("MongoDB URI is not defined in ENV ");
        }
        console.log("Connecting to database.....")
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("connected to database")
    } catch (e) {
        console.error("error while connecting to mongoDB",e);
    }
}

export default connectDB;