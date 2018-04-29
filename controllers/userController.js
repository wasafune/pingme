const { Router } = require('express')
const User = require('../mongo/userSchema')
const bcrypt = require('bcrypt')

const salt = bcrypt.genSaltSync(10)
const router = new Router()

// Sign-up route

router.post('/signup', async (req, res) => {
  try {
    await User.create(req.body)
    res.send(true)
  } catch (err) {
    console.error(err)
    res.send(false)
  }
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const userObj = await User
      .findOne({ email })
      .select('+password')
      .lean()
    if (!userObj) {
      res.send(null)
      return
    }
    const match = await bcrypt.compare(password, userObj.password)
    if (match) {
      delete userObj.password
      req.session.loggedIn = true
      req.session.userId = userObj._id.toString()
      res.send(userObj)
    } else {
      res.send(null)
    }
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

module.exports = router
