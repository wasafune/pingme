const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bp = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const PORT = process.env.PORT2 || 3000
const app = express()

mongoose.connect(process.env.DB_HOST);

app.use(cors())
app.use(bp.json())
app.use(session({
  secret: 'hidomo',
  resave: false,
  saveUninitialized: false,
}))

app.use(bp.urlencoded({ extended: true }))

const userController = require('./controllers/userController')
const searchController = require('./controllers/searchController')

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))

// post route middleware
app.use('/user', userController)
app.use('/search', searchController)

// Base route
app.get('/*', (req, res) => {
  console.log(req.session)
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`)
})
