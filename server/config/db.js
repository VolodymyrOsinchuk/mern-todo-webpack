const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
<<<<<<< HEAD
      process.env.MONGO_URI || 'mongodb://localhost:27017/mern-todo'
    )
=======
      process.env.MONGO_URI || "mongodb://localhost:27017/mern-todo",
    );
>>>>>>> 0a27e18 (Fix MUI prop warnings in todo components)

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
