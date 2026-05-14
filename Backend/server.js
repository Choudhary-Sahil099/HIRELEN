import "./config/env.js";
import express from "express";
import cors from "cors";
import passport from "passport";
import http from "http";
import { Server } from "socket.io";
import "./config/passport.js";
import "./config/db.js";

import authRoutes from "./routes/auth.js";
import submissionRoutes from "./routes/submissionRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import contestRoutes from "./routes/contestRoutes.js";
import problemRoutes from "./routes/problemRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import progressRoutes from "./routes/progressRoutes.js";
import codeExecutionRoutes from "./routes/codeExecutionRoutes.js";
import dashboardRoutes from "./routes/dashboardRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import aiInterviewRoutes from "./routes/aiInterviewRoutes.js";
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use(cors());
app.use(express.json());
app.use(passport.initialize());
app.use("/api/auth", authRoutes);
app.use("/api/submissions", submissionRoutes);
app.use("/api/users", userRoutes);
app.use("/api/activity", activityRoutes);
app.use("/api/contest", contestRoutes);
app.use("/api/problems", problemRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/progress", progressRoutes);
app.use("/api/code", codeExecutionRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/ai-interview", aiInterviewRoutes);
app.use("/uploads", express.static("uploads"));

io.on("connection", (socket) => {
  console.log("USER CONNECTED:", socket.id);
  socket.on("join-session", (sessionId) => {
    socket.join(sessionId);

    console.log(`Socket joined session: ${sessionId}`);
  });
  socket.on("candidate-message", async (data) => {
    const { sessionId, message } = data;

    console.log("Candidate Message:", message);
    io.to(sessionId).emit("new-message", {
      sender: "candidate",
      message,
    });
    try {
      console.log("CALLING AI ROUTE...");

      const response = await fetch(
        "http://localhost:5000/api/ai-interview/respond",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            sessionId,
            message,
          }),
        },
      );

      console.log("AI STATUS:", response.status);

      const aiData = await response.json();

      console.log("AI DATA:", aiData);

      io.to(sessionId).emit("new-message", {
        sender: "ai",

        message: aiData.aiReply || aiData.message || "No AI response",
      });
    } catch (err) {
      console.error("AI SOCKET ERROR:", err);

      io.to(sessionId).emit("new-message", {
        sender: "ai",

        message: "AI failed to respond",
      });
    }
  });
  socket.on("disconnect", () => {
    console.log("USER DISCONNECTED:", socket.id);
  });
});

const PORT = 5000;

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
