import mongoose from "mongoose";

const userAddressSchema = new mongoose.Schema(

    {
        user_id : {
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
            required : true
        },
        address_line : {
            type : String,
            required : true,
            trim : true
        },
        area : {
            type : String,
            required : true,
            trim : true
        },
        city:{
            type : String,
            required : true,
            trim : true
        },
        state : {
            type : String,
            required : true,
            trim : true,
        },
        pincode : {
            type : String,
            required : true,
            match : /^\d{6}$/
        },
        latitude : {
            type : Number,
            required : true
        },
        longitude : {
            type : Number,
            required : true
        },
        is_default : {
            type : Boolean,
            default : false
        }
    },

    {
    timestamps: true,
    }

)

userAddressSchema.pre("save", async function() {
  if (this.is_default) {
    await mongoose.model("UserAddress").updateMany(
      { user_id: this.user_id },
      { $set: { is_default: false } }
    );
  }
});

userAddressSchema.index({ user_id: 1 });

export const UserAddress = mongoose.model("UserAddress", userAddressSchema);