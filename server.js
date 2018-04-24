require('dotenv').config()
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

app.use(bp.urlencoded({extended: true}))

const user = require("./mongo/controllers/userController")
const test = require('./mongo/controllers/testController')
const session = require('./mongo/controllers/sessionController')

// Serve static files
app.use(express.static(path.join(__dirname, 'dist')))
// app.use('/user', user)
app.post('/user/signup', (req,res) => {
  user.signUp(req, res)
})

app.post('/user/test', (req, res) => {
  console.log('server', req.body)
  test.test(req, res)
})

// Loggin route
app.post('/user/login', user.verify)

// Base route
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/index.html'))
})

// Start server
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}...`)
})
