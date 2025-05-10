import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express()


app.use(express.json());
app.use(express.urlencoded({extended:true}))


app.use(
    cors({
      origin: 'http://localhost:5173',
      credentials: true,
    })
);
app.use(cookieParser());


//routes declaration

//user router
import userRouter from './routes/user.route.js'

app.use('/api/users',userRouter);
  
//interview router
import interviewRouter from './routes/interview.route.js'

app.use('/api/interview-requests',interviewRouter)


export {app}