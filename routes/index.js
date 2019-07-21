const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');

router.get("/",(req,res)=>{
    res.redirect("/main/dash")
})

module.exports = router;