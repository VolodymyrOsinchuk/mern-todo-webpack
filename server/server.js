require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");

const connectDB = require("./config/db");
const todoRoutes = require("./routes/todo");
const asyncHandler = require("./middleware/asyncHandler");

const app = express();
const PORT = process.env.PORT || 5001;
const isProduction = process.env.NODE_ENV === "production";
const isVercel = !!process.env.VERCEL;

if (isProduction) {
  app.set("trust proxy", 1);
}

app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);

const corsOptions = {
  origin: process.env.CORS_ORIGIN
    ? process.env.CORS_ORIGIN.split(",").map((origin) => origin.trim())
    : true,
};
app.use(cors(corsOptions));
app.use(express.json());

if (!isProduction) {
  app.use(morgan("dev"));
}

app.get("/api/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use(
  "/api/todos",
  asyncHandler(async (req, res, next) => {
    await connectDB();
    next();
  }),
  todoRoutes,
);

if (isProduction && !isVercel) {
  const clientDistPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));

  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  if (
    err.statusCode === 503 ||
    err.name === "MongooseServerSelectionError" ||
    err.name === "MongoServerSelectionError"
  ) {
    return res.status(503).json({ message: "Database connection unavailable" });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Server Error" : err.message,
  });
});

if (!isVercel && require.main === module) {
  connectDB()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server running locally on port ${PORT}`);
      });
    })
    .catch((error) => {
      console.error(`Database connection failed: ${error.message}`);
      process.exit(1);
    });
}

module.exports = app;
