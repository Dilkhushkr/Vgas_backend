import express from "express";
import { sendOtp, verifyOtp,adminLogin } from "../controllers/auth.controller.ts";

const router = express.Router();

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);
router.post("/admin-login", adminLogin);

export default router;
