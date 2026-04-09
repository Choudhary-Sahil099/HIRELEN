import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import {
  createUser,
  findUserByEmail,
  saveOTP,
  verifyOTP
} from "../models/User.js";

import { generateOTP } from "../utils/otpGenerator.js";
import { sendOTP } from "../utils/mailSender.js";

const router = express.Router();
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: "http://localhost:5173/login",
  }),
  (req, res) => {
    const token = jwt.sign(
      {
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        avatar: req.user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.redirect(`http://localhost:5173/dashboard?token=${token}`);
  }
);

router.post("/signup", async (req, res) => {
  try {
    console.log("Signup hit:", req.body);

    const { name, email, password } = req.body;

    const existingUser = await findUserByEmail(email);
    console.log("Existing user:", existingUser);

    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await createUser({
      name,
      email,
      password: hashedPassword,
    });

    console.log("User created ID:", userId);

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await saveOTP(userId, otp, expiry);

    console.log("OTP saved");

    res.json({ message: "OK" });

  } catch (error) {
    console.error("SIGNUP ERROR:", error);
    res.status(500).json({ message: "Server error" });
  }
});

router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isValid = await verifyOTP(user.id, otp);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Email verified successfully",
      token,
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await findUserByEmail(email);

    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.is_verified) {
      return res.status(400).json({
        message: "Please verify your email first",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar_url,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});
router.post("/resend-otp", async (req, res) => {
  try {
    const { email } = req.body;

    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = generateOTP();
    const expiry = new Date(Date.now() + 5 * 60 * 1000);

    await saveOTP(user.id, otp, expiry);

    await sendOTP(email, otp);

    res.json({ message: "OTP resent successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;