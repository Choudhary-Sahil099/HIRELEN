import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    avatar: String,

    googleId: {
      type: String,
      unique: true,
      sparse: true, 
    },
    authProvider: {
      type: String,
      enum: ["google", "local"],
      default: "google",
    },
    password: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);