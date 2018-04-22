const {
  getUserInfo,
} = require('../queryFuncs/usersQuery');


const test = async (req, res) => {
  const { body } = req;
  console.log(body);
  const user = {
    userName: body.userName,
    password: body.password,
    age: body.age,
  };
  // if auth success
  const userInfo = await getUserInfo(user.userName);
  console.log(userInfo);
  res.send(userInfo);
};

module.exports = {
  test,
};
