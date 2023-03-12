import express from "express"
import { loginUser } from "../controllers/authController.js";
import verifyToken from "../middleware/tokenAuth.js";

const router = express.Router()



router.route("/login").post(loginUser);

export default router