const router = require("express").Router();

const User = require("../models/User.model");

const bcrypt = require("bcryptjs");
const saltRounds = 12;




router.get("/home" , (req, res) => {
    console.log("wtf")
    res.render("/views/home.hbs")
  });




// SIGNUP FORM 

router.get("/signup", (req, res, next) => {
    res.render("auth/sign-up");
  });  



router.post("/signup", (req, res, next) => {
    const { username, password } = req.body
  
    if (username === "" || password === "") {
      res.render("auth/sign-up", {errorMessage: "Username and Password are required."});
      return;
    }
  
  
    User.findOne({ username })
      .then((userObj) => {
        if (userObj) {
          res.render("index", {errorMessage: `Username ${username} is already taken.`});
          return;
        } else {
          const salt = bcrypt.genSaltSync(saltRounds);
          const hashedPassword = bcrypt.hashSync(password, salt);
  
          User.create({ username, password: hashedPassword })
          .then((user) => {
              res.redirect("/home");
            })
            .catch((err) => res.render("index", {errorMessage: `Error during signup`}));
        }
      }).catch((err) => next(err));
})
  
 

//LOGIN FORM



router.get("/login", (req, res, next) => {
    res.render("auth/login");
});  
  

router.post("/login", (req, res, next) => {
    const { username, password } = req.body
  
    if (username === "" || password === "") {
      res.render("auth/login", {errorMessage: "Username and Password are required."});
      return;
    }
  
  
    User.findOne({ username })
      .then(user => {
        if (!user) {
          res.render("auth/login", {errorMessage: "Invalid input"});
          return;
        } else {
            const encryptedPassword = user.password;
            const passwordCorrect = bcrypt.compareSync(password, encryptedPassword);
  
            if(passwordCorrect) {
                req.session.currentUser = user;
                res.redirect("home")
              }
              else res.render("auth/login", { errorMessage: "Name OR pwd is incorrect" });
      
        }
      }).catch((err) => next(err));
})
  





  module.exports = router;  