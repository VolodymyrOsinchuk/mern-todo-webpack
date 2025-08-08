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
