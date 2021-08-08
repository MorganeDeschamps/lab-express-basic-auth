const router = require("express").Router();

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const saltRounds = 12;


/* GET home page */
router.get("/", (req, res, next) => {
  console.log("wtf")
  res.render("index");
});

 

router.get("/home" , (req, res) => {
  res.render("home")
}); 


module.exports = router;

