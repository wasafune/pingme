const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const bp = require('body-parser')
const session = require('express-session')
const cors = require('cors')

const PORT = process.env.PORT || 3000
const app = express()

mongoose.connect(process.env.DB_HOST);

app.use(cors())
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}))


// import controllers
const userController = require('./controllers/userController')
const searchController = require('./controllers/searchController')
const scraperController = require('./scraper/controllers/scraperController');

// import autoUpdater
const { autoUpdate, hourInMilli } = require('./scraper/autoUpdate.js');

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'media')))

// post route middleware
app.use('/user', userController)
app.use('/search', searchController)
app.use('/scraper', scraperController);

// media content route
app.use('/media', (req, res) => {
  res.sendFile(path.join(__dirname, `media${req.url}`))
})

// Base route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Start server
app.listen(PORT, async () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${PORT}...`)
  console.log(process.env.LOCAL_USER)
  console.log(process.env.UPDATER_ROUTE)
  if (!process.env.LOCAL_USER) {
    autoUpdate(hourInMilli * 2);
  }
})
