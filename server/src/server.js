import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import todoRoutes from "./routes/todoRoutes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;
const mongoUri = process.env.MONGO_URI;
const allowedOrigins = (
  process.env.CLIENT_ORIGIN || "http://localhost:5173,http://127.0.0.1:5173"
)
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

function isAllowedOrigin(origin) {
  if (!origin) return true;
  if (allowedOrigins.includes("*")) return true;
  if (allowedOrigins.includes(origin)) return true;

  try {
    const { hostname, protocol } = new URL(origin);
    const isLocalhost = hostname === "localhost" || hostname === "127.0.0.1";
    const isPrivateNetwork =
      hostname.startsWith("10.") ||
      hostname.startsWith("192.168.") ||
      /^172\.(1[6-9]|2\d|3[0-1])\./.test(hostname);
    const isNetlify = hostname.endsWith(".netlify.app");

    return protocol === "http:" && (isLocalhost || isPrivateNetwork) || isNetlify;
  } catch {
    return false;
  }
}

app.use(
  cors({
    origin: (origin, callback) => {
      if (isAllowedOrigin(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.get("/", (_req, res) => {
  res.json({ message: "MERN Todo API is running" });
});

app.use("/api/todos", todoRoutes);

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message || "Something went wrong",
  });
});

if (!mongoUri) {
  console.error("MONGO_URI is required. Add it to server/.env");
  process.exit(1);
}

async function startServer() {
  try {
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 5000 });

    app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    console.error("Check MONGO_URI in your environment variables.");
    process.exit(1);
  }
}

process.on("SIGINT", async () => {
  await mongoose.disconnect();
  process.exit(0);
});

startServer();
