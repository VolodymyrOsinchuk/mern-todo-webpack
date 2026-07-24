<<<<<<< HEAD
// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const path = require('path')

// const todoRoutes = require('./routes/todo')
// const connectDB = require('./config/db')

// const app = express()

// // Connexion à MongoDB
// connectDB()
// const isProduction = process.env.NODE_ENV === 'production'
// // Middleware
// app.use(cors())
// app.use(express.json())

// // Routes de l'API
// app.use('/api/todos', todoRoutes)

// // Ce bloc ne s'exécute que pour le développement local
// if (!process.env.VERCEL && require.main === module) {
//   app.use(express.static(path.join(__dirname, '../client/dist')))
//   app.get('/', (req, res) => {
//     res.send('<h1>Welcome to the MERN Todo App</h1>')
//   })
//   console.log(`Environment: ${process.env.NODE_ENV}`)
//   // // Pour toutes les autres requêtes, renvoyer l'app React en production
//   if (process.env.NODE_ENV === 'production') {
//     app.get(/.*/, (req, res) => {
//       res.sendFile(path.join(__dirname, '../../dist/index.html'))
//     })
//   }
//   console.log(path.join(__dirname, '../client/dist', 'index.html'))

//   const PORT = process.env.PORT || 5001

//   app.listen(PORT, () => {
//     console.log(`Server running for local development on port ${PORT}`)
//   })
// }

// // Exporter l'application pour Vercel
// module.exports = app
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path')
const fs = require('fs')

const connectDB = require('./config/db')
const todoRoutes = require('./routes/todo')

const app = express()

// 🌍 Détection de l'environnement
const isProduction = process.env.NODE_ENV === 'production'
console.log('🚀 ~ isProduction :', isProduction)
const isVercel = !!process.env.VERCEL
console.log('🚀 ~ isVercel:', isVercel)
const PORT = process.env.PORT || 5001

// 🔗 Connexion à MongoDB
connectDB()

// 🔐 Middleware
app.use(cors())
app.use(express.json())

// 📦 Routes API
app.use('/api/todos', todoRoutes)
app.get('/api/hello', (req, res) => {
  res.json({
    message: 'Hello from MERN Todo App!',
    timestamp: new Date().toISOString(),
  })
})
const staticPath = path.resolve(__dirname, '../client/dist')

if (fs.existsSync(path.join(staticPath, 'index.html'))) {
  app.use(express.static(staticPath, { maxAge: '30d' }))
  app.get(/.*/, (req, res) => {
    res.sendFile(path.join(staticPath, 'index.html'))
  })
}
// 🗂️ Fichiers statiques en production locale
// if (isProduction && !isVercel) {
//   const staticPath = path.resolve(__dirname, '../client/dist')

//   if (fs.existsSync(path.join(staticPath, 'index.html'))) {
//     app.use(express.static(staticPath, { maxAge: '30d' }))
//     app.get(/.*/, (req, res) => {
//       res.sendFile(path.join(staticPath, 'index.html'))
//     })
//   } else {
//     console.warn('⚠️ index.html not found in client/dist')
//   }
// }

// 🚀 Démarrage du serveur en local uniquement
if (!isVercel && require.main === module) {
  console.log(require.main)
  app.get('/', (req, res) => {
    res.send('<h1>Welcome to the MERN Todo App</h1>')
  })

  app.listen(PORT, () => {
    console.log(`🚀 Server running locally on port ${PORT}`)
    console.log(`🌱 Environment: ${process.env.NODE_ENV}`)
  })
}

// 📤 Export pour Vercel
module.exports = app
=======
// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const path = require("path");
require("dotenv").config();

const todoRoutes = require("./routes/todo");
const connectDB = require("./config/db");

const app = express();
const PORT = process.env.PORT || 5000;
const isProduction = process.env.NODE_ENV === "production";

// Connect to MongoDB
connectDB();

// Nécessaire derrière un reverse proxy (Render, Heroku, Nginx...)
if (isProduction) {
  app.set("trust proxy", 1);
}

// Middleware
app.use(
  helmet({
    // Désactivée par défaut pour ne pas casser le SPA servi statiquement ;
    // à affiner (script-src, style-src...) une fois le build front stabilisé.
    contentSecurityPolicy: false,
  }),
);

const corsOptions = {
  // CORS_ORIGIN="https://mondomaine.com,https://www.mondomaine.com"
  // Non définie => comportement actuel conservé (tout autorisé).
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

// Routes
app.use("/api/todos", todoRoutes);

// Serve static assets in production
if (isProduction) {
  const clientDistPath = path.join(__dirname, "../client/dist");
  app.use(express.static(clientDistPath));

  // SPA fallback : renvoie index.html pour toute route non-API.
  // On évite le pattern '*' (cassé sous Express 5 / path-to-regexp récent :
  // https://github.com/expressjs/express/issues/6711) en utilisant un
  // middleware sans path pattern du tout.
  app.use((req, res, next) => {
    if (req.path.startsWith("/api")) {
      return next();
    }
    res.sendFile(path.join(clientDistPath, "index.html"));
  });
}

// 404 JSON pour toute route API non reconnue
app.use("/api", (req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Middleware de gestion d'erreurs centralisé (doit rester en dernier)
// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);

  if (err.name === "CastError") {
    return res.status(400).json({ message: "Invalid ID format" });
  }

  if (err.name === "ValidationError") {
    return res.status(400).json({ message: err.message });
  }

  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    message: statusCode === 500 ? "Server Error" : err.message,
  });
});

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const shutdown = (signal) => {
  console.log(`${signal} received: closing server gracefully`);
  server.close(() => {
    mongoose.connection
      .close(false)
      .then(() => {
        console.log("MongoDB connection closed");
        process.exit(0);
      })
      .catch((err) => {
        console.error("Error while closing MongoDB connection", err);
        process.exit(1);
      });
  });
};

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
>>>>>>> 0a27e18 (Fix MUI prop warnings in todo components)
