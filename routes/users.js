const express = require('express');
const router = express.Router();
const passport = require("passport");


 
// Login page
router.get("/login",(req,res)=>{
    res.render("login")
});

// register page
router.get("/register",(req,res)=>{
    res.render("register")
});
// Register handle
router.post("/register",(req,res)=>{
    const {username,password,password2} = req.body
    let errors = [];

    // check for required fields
    if (!username || !password || !password2) {
        errors.push({msg: "Please fill in all fields"});
    }

    // check password
    if (password != password2) {
        errors.push({msg: "Password do not match"});
    }
    if (password.length < 6) {
        errors.push({msg:"Password too long"})
    }
    if (errors.length > 0) {
        res.render("register",{
            errors,
            username,
            password,
            password2,
        });
        console.log(errors)
        console.log(username,password,password2)
    }

    else{
        // app.post("/users/register/",(req,res)=>{
            // const insert = "INSERT INTO login SET ?";
            const admin = {
                username: req.body.username,
              password: req.body.password
            }
          
            // connection.query(insert,admin,(err,results)=>{
            //   if(err){
            //     throw err
            //   }
            //   console.log(results);
            //   res.redirect("/");
            // })
        //   });
          console.log(admin)
          res.send("hello");
    }
});

//login handle
router.post('/login',(req,res,next)=>{
   passport.authenticate('local-login',{
       successRedirect: "/home",
       failureRedirect: "/users/login",
       failureFlash: true
   })(req,res,next);
  
})
module.exports = router;