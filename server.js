require('dotenv').config()
const express = require('express')
const path = require('path')

const PORT = process.env.PORT || 3000
const app = express()

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))

// Base route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`)
})
