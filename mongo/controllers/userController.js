// const { Router } = require('express');
const User = require("../userSchema");

// const router = Router();

// Sign-up route



module.exports = {
  signUp: (req, res) => {
    const user = {
      userName: req.body.userName,
      password: req.body.password,
      age: req.body.age,
    }
    console.log(user)
    console.log(req.body)
    User.create(user)
      .then(result => {
        res.send(result)
        console.log('user created')
      }).catch(err => {
        res.send(err)
        console.log('user creation error')
      })
  }
}
