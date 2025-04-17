import { Router } from "express";
import {getUserDetails, loginUser, registerUser} from "../controllers/user.controller.js";
import { veriftJWT } from "../middlewares/auth.middleware.js";


const router= Router();

//register user
router.route('/register').post(registerUser);

//login user
router.route('/login').post(loginUser);

//get user details
router.route('/me').get(veriftJWT,getUserDetails)

export default router