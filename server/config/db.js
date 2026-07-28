const mongoose = require("mongoose");

mongoose.set("bufferCommands", false);

const LOCAL_MONGODB_URI = "mongodb://127.0.0.1:27017/mern-todo";
const isProduction = process.env.NODE_ENV === "production";
const connectTimeoutMS = Number(process.env.MONGODB_CONNECT_TIMEOUT_MS) || 5000;

let connectionPromise;

const connectDB = async () => {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  const mongoUri =
    process.env.MONGODB_URI ||
    process.env.MONGO_URI ||
    (!isProduction && LOCAL_MONGODB_URI);

  if (!mongoUri) {
    const error = new Error("Missing MongoDB connection string. Set MONGODB_URI.");
    error.statusCode = 503;
    throw error;
  }

  if (!connectionPromise) {
    connectionPromise = mongoose
      .connect(mongoUri, {
        serverSelectionTimeoutMS: connectTimeoutMS,
        connectTimeoutMS,
        maxPoolSize: 10,
      })
      .then((conn) => {
        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn.connection;
      })
      .catch((error) => {
        connectionPromise = undefined;
        throw error;
      });
  }

  return connectionPromise;
};

module.exports = connectDB;
