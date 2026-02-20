import type{ Request, Response } from "express";
import jwt from "jsonwebtoken";
import { sendOtpToPhone } from "../utils/sendOtp.ts";
import {User} from "../models/Otp.ts";

const generateOtp = () =>
  Math.floor(100000 + Math.random() * 900000).toString();


export const sendOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;
    const appType = req.headers["x-app-type"] as string; 
    // "user" | "driver" | "distributor"

    console.log("App Type:", appType);
    console.log("Phone:", phone);
    if (!phone) {
      return res.status(400).json({ message: "Phone is required" });
    }

    let user = await User.findOne({ phone });

    // 🆕 New user → assign role based on app-type
    if (!user) {
      let role = "user";

      if (appType === "driver") role = "driver";
      if (appType === "distributor") role = "distributor";

      user = await User.create({ phone, role });
    }

    // ❗ Existing user → role stays same

    const otp = generateOtp();
    console.log(`Generated OTP for ${phone}: ${otp}`);

    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + 5 * 60 * 1000);
    await user.save();



    await sendOtpToPhone(phone, otp);

    res.json({ message: "OTP sent successfully" });
  } catch (error: any) {
  console.log("TWILIO FULL ERROR:", error);
  console.log("TWILIO MESSAGE:", error.message);
  console.log("TWILIO CODE:", error.code);
  res.status(500).json({
    message: "Error sending OTP",
    error: error.message
  });
}
};

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { phone, otp } = req.body;

    const user = await User.findOne({ phone });

    if (!user || user.otp !== otp || user.otpExpiry! < new Date()) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    
    await user.save();

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" }
    );

    res.json({
      token,
      role: user.role
    });

  } catch (error) {
    res.status(500).json({ message: "Error verifying OTP" });
  }
};