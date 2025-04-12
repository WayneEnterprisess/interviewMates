import dotenv from "dotenv";
dotenv.config({ path: "/.env" });
import { app } from "./app.js";
import connectDB from './db/connectDB.js'

console.log(process.env.MONGODB_URI ? "URI available" : "URI not available");

const port = process.env.PORT || 5000;

connectDB()
    .then(()=>{
        app.listen(port,()=>{
        console.log(`app is listening on port ${port}`)
    })
}).catch((err)=>{
    console.error("error while connecting to database", err);
})
