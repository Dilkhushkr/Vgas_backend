import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    phone: { type: String, unique: true, required: true },

    role: {
      type: String,
      enum: ["user", "driver", "distributor"],
      default: "user"
    },

    otp: String,
    otpExpiry: Date
  },
  { timestamps: true }
);

export const User = mongoose.model("User", userSchema);