// import { client, TWILIO_PHONE } from "../config/twilio.ts";

// export const sendOtpToPhone = async (phone: string, otp: string) => {


//   await client.messages.create({
//     body: `Your OTP is ${otp}`,
//     from: TWILIO_PHONE,
//     to: `+91${phone}`
//   });
// };

// utils/sendOtp.ts
import twilio from "twilio";

export const sendOtpToPhone = async (phone: string, otp: string) => {
  if (!process.env.TWILIO_ACCOUNT_SID || !process.env.TWILIO_AUTH_TOKEN || !process.env.TWILIO_PHONE_NUMBER) {
    throw new Error("Twilio credentials missing");
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );

  return await client.messages.create({
    body: `Your OTP is ${otp}`,
    from: process.env.TWILIO_PHONE_NUMBER,
    to: `+91${phone}`,
  });
};