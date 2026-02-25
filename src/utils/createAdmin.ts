import bcrypt from "bcryptjs";
import Admin from "../models/Admin.ts";



export const createAdmin = async (): Promise<void> => {
  try {
    const existingAdmin = await Admin.findOne({ email: "admin@gmail.com" });

    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword: string = await bcrypt.hash("admin123", 10);

    await Admin.create({
      email: "admin@gmail.com",
      password: hashedPassword,
    });

    console.log("✅ Admin created");
  } catch (err: any) {
    console.error("❌ Error:", err.message);
  }
};