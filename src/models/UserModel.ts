import mongoose  from "mongoose";

const userSchema = new mongoose.Schema(

    {
        phone_number : {
            type : String,
            required : true,
            unique : true,
            trim : true,
            match : /^[6-9]\d{9}$/,
        },
        full_name : {
            type : String,
            required : true,
            trim : true,
        },
        email:{
            type : String,
            required : true,
            trim : true,
            lowercase : true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        },
        profile_picture : {
            type : String,
            default : null
        },
        is_active : {
            type : Boolean,
            default : true
        }
    },
    {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
    }
)

userSchema.index({ phone_number: 1 });

export const User_profile = mongoose.model("User", userSchema);
