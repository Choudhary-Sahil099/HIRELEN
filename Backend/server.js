import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interview.routes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/interview", interviewRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});