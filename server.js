const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bp = require('body-parser')
const cors = require('cors')

const PORT = process.env.PORT2 || 3000
const app = express()

mongoose.connect(process.env.DB_HOST);

app.use(cors())
app.use(bp.json())

app.use(bp.urlencoded({ extended: true }))

const user = require('./controllers/userController')
const search = require('./controllers/searchController')

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))

// post route middleware
app.post('/user/signup', user.signUp)
app.post('/user/login', user.verify)
app.post('/search', search.searchAll)

// Base route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`)
})
