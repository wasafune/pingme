const { Router } = require('express')
const User = require('../mongo/userSchema')
const bcrypt = require('bcrypt')

const {
  pushFollowing, subscribeFollowing,
  unsubscribeFollowing, pullFollowing,
  toggleNotifications, offNotifications,
} = require('../mongo/queryFuncs/usersUpdate')
const {
  addFollower, subscribeFollower,
  unsubscribeFollower, pullFollower,
} = require('../mongo/queryFuncs/mangasUpdate')
const { retrieveMangas } = require('../mongo/queryFuncs/mangasQuery')

const router = new Router()


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

router.get('/check', async (req, res) => {
  try {
    const { loggedIn, userId } = req.session
    if (loggedIn) {
      const userObj = await User.findById(userId).lean()
      res.send(userObj)
      return
    }
    res.send(null)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.get('/logout', (req, res) => {
  req.session.loggedIn = false
  req.session.userId = ''
  res.send(true)
})

router.post('/follow', async (req, res) => {
  const promiseArr = []
  const { userId, mangaId, subscribe } = req.body
  try {
    promiseArr.push(pushFollowing(userId, mangaId, subscribe).lean())
    promiseArr.push(addFollower(mangaId, userId, subscribe).lean())
    await Promise.all(promiseArr)
    const userObj = await User.findById(userId).lean()
    res.send(userObj)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/unfollow', async (req, res) => {
  const promiseArr = []
  const { userId, mangaId } = req.body
  try {
    promiseArr.push(pullFollowing(userId, mangaId).lean())
    promiseArr.push(pullFollower(mangaId, userId).lean())
    await Promise.all(promiseArr)
    const userObj = await User.findById(userId).lean()
    res.send(userObj)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/subscribe', async (req, res) => {
  const promiseArr = []
  const { userId, mangaId } = req.body
  try {
    promiseArr.push(subscribeFollowing(userId, mangaId).lean())
    promiseArr.push(subscribeFollower(mangaId, userId).lean())
    await Promise.all(promiseArr)
    const userObj = await User.findById(userId).lean()
    res.send(userObj)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/unsubscribe', async (req, res) => {
  const promiseArr = []
  const { userId, mangaId } = req.body
  try {
    promiseArr.push(unsubscribeFollowing(userId, mangaId).lean())
    promiseArr.push(unsubscribeFollower(mangaId, userId).lean())
    await Promise.all(promiseArr)
    const userObj = await User.findById(userId).lean()
    res.send(userObj)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/retrieveMangas', async (req, res) => {
  const { followingList } = req.body
  try {
    const retrievedList = await retrieveMangas(followingList)
    res.send(retrievedList)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/notification', async (req, res) => {
  const { userId, bool } = req.body
  try {
    await toggleNotifications(userId, !bool)
    res.send(true)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})

router.post('/unsub', async (req, res) => {
  const { email, hash } = req.body
  try {
    await offNotifications(email, hash)
    res.send(true)
  } catch (err) {
    console.error(err)
    res.send(null)
  }
})


module.exports = router
