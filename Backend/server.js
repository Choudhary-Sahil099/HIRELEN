import "./config/env.js";
import express from "express";
import cors from "cors";
import passport from "passport";
import "./config/passport.js";
import authRoutes from "./routes/auth.js";
import connectDB from "./config/db.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(passport.initialize());

app.use("/api/auth", authRoutes);

const PORT = 5000;

connectDB();

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});