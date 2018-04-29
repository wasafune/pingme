const { Router } = require('express')

const {
  searchMangas,
} = require('../mongo/queryFuncs/mangasQuery')

const router = new Router()

router.post('/', async (req, res) => {
  const { searchStr } = req.body
  const searchArr = await searchMangas(searchStr)
  res.send(searchArr)
})

router.post('/more', async (req, res) => {
  const { searchStr, index } = req.body
  const searchArr = await searchMangas(searchStr, index)
  res.send(searchArr)
})

module.exports = router
