import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
      credentials: true,
    })
);
app.use(cookieParser());


//routes declaration
import userRouter from './routes/user.route.js'

app.use('/api/users',userRouter);
  


export {app}