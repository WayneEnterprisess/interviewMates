import { Router } from "express";
import {getUserDetails, loginUser, logoutUser, registerUser, uploadPhoto} from "../controllers/user.controller.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";


const router= Router();

//register user
router.route('/register').post(registerUser);

//login user
router.route('/login').post(loginUser);

//logout user
router.route('/logout').post(veriftJWT,logoutUser);

//get user details
router.route('/me').get(veriftJWT,getUserDetails)

//change picture
router.route('/uploadavatar').post(
    veriftJWT,
    upload.fields([{
        name:'avatar',
        maxCount:1
    }])
    ,
    uploadPhoto);


export default router