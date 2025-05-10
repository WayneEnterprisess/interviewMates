import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { createRequest, getPendingRequests } from "../controllers/interview.controller.js";

const router = Router();

router.route('/create-request').post(verifyJWT,createRequest)

router.route('/pending-requests').get(verifyJWT,getPendingRequests)

export default router