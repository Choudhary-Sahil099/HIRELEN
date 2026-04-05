import dotenv from "dotenv";

dotenv.config({ path: "./.env" });

console.log("ENV LOADED:", process.env.GOOGLE_CLIENT_ID);