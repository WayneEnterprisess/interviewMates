import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createRequest } from "../controllers/interview.controller.js";

const router = Router();

router.route('/create-request').post(verifyJWT,createRequest)

export default router