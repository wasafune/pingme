const {
  searchMangas,
} = require('../mongo/queryFuncs/mangasQuery');


const searchAll = async (req, res) => {
  const { searchStr } = req.body;
  const searchArr = await searchMangas(searchStr);
  res.send(searchArr);
};

module.exports = {
  searchAll,
};
