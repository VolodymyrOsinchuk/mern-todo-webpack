require('dotenv').config()
const express = require('express')
const cors = require('cors')
const path = require('path') // Assurez-vous que path est importé

const todoRoutes = require('./routes/todo')
const connectDB = require('./config/db')

const app = express()

// Connexion à MongoDB
connectDB()

// Middleware
app.use(cors())
app.use(express.json())

// Routes de l'API
app.use('/api/todos', todoRoutes)

// Ce bloc ne s'exécute que pour le développement local
if (!process.env.VERCEL) {
  // Sert les fichiers statiques du client React
  app.use(express.static(path.join(__dirname, '../client/dist')))

  // La route catch-all : pour toute requête qui ne correspond pas à l'API,
  // renvoyer l'index.html de React.
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'))
  })

  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// Exporter l'application pour Vercel
module.exports = app