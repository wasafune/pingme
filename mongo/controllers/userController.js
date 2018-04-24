// const { Router } = require('express');
const User = require("../userSchema");
const bcrypt = require('bcrypt');
var salt = bcrypt.genSaltSync(10);

// const router = Router();

// Sign-up route

module.exports = {
  signUp: (req, res) => {
    const user = {
      userName: req.body.userName,
      password: req.body.password,
      age: req.body.age,
    };
    console.log(user);
    console.log(req.body);
    User.create(user)
      .then(result => {
        res.send(result);
        console.log('user created');
      })
      .catch(err => {
        res.send(err);
        console.log('user creation error');
      });
  },

  verify: (req, res) => {
    User.findOne({ userName: req.body.userName })
      .select('+password')
      .then(result => {
        console.log('doc info', req.body);
        console.log('doc true', result);
        // bcrypt.compare(req.body.password, doc.password, (err, isMatch) => {
        //   if (err) return res.send(err)

        // })
        var hash = bcrypt.hashSync(req.body.password, salt);
        console.log('hash', hash);
        if (bcrypt.compareSync(result.password, hash)) {
          console.log('inside');
          res.send(doc);
        } else res.redirect('/user/signUp');
      })
      .catch(err => {
        res.send(err);
        console.log('verify error');
      });
  },
};
