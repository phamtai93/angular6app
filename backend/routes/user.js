const express = require("express");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User ({
        email: req.body.email,
        password: hash
      });
      user.save()
        .then(result => {
          res.status(201).json({
            message: 'user created!',
            result: result
          })
        })
        .catch(err => {
          res.status(500).json({
            error: err
          })
        });
    });
});

router.post("/login", (req, res, next) => {
  User.find({email: req.body.email})
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      return bcrypt.compare(req.body.password, user.password)
    })
    .then(result => {
      console.log(result);
      if (!result) {
        return res.status(401).json({
          message: "Auth failed"
        })
      }
      const token = jwt.sign({email: user.email, userId: user._id},
        "secret_this_should_be_longer", { expiresIn: "1h"});
      res.status(200).json({
        token: token
      })
      console.log(token);
    })
    .catch(err => {
      console.log(err);
      return res.status(401).json({
        message: "Auth failed"
      })
    })
});
module.exports = router;
