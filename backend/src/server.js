import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

dotenv.config();
const app = express();

// connect to MongoDB
connectDB();

// middleware
const allowedOrigins = [
  "http://localhost:5173",
  process.env.CLIENT_URL, // Netlify URL in production
].filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // allow requests with no origin (Postman, curl)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);

app.use(express.json());
app.use(morgan("dev"));

// routes
app.get("/", (req, res) => {
  res.json({ message: "ApplyFlow API is live" });
});

app.use("/api/auth", authRoutes);
app.use("/api/applications", applicationRoutes);

// 404 + error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
