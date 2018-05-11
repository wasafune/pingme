const { Router } = require('express')

const {
  searchMangas,
} = require('../mongo/queryFuncs/mangasQuery')

const router = new Router()

router.post('/', async (req, res) => {
  const { searchStr, typeStr } = req.body
  const searchArr = await searchMangas(searchStr, typeStr)
  res.send(searchArr)
})

router.post('/more', async (req, res) => {
  const { searchStr, typeStr, index } = req.body
  const searchArr = await searchMangas(searchStr, typeStr, index)
  res.send(searchArr)
})

module.exports = router
