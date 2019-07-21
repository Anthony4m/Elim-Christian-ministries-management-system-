const express = require('express');
const router = express.Router();
const expressLayouts = require('express-ejs-layouts');
const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jahbless1',
    database : 'ELIM_CHRISTIAN_CENTRE'
  });
  
//   WELCOME PAGE OF DASHBOARD 
  router.get("/dash",(req,res)=>{
    const qry = 'SELECT COUNT(*) as count FROM members';
    connection.query(qry,(err,results)=>{
      if(err){
        throw err
      }
      // for loop to display number of users
      for(let i = 0; i < results.length; i++){
        let count = results[i].count;
        res.render("home",{count:count});
      }
    })
  });

  //   DISPLAY ALL USERS 
router.get("/main/members",(req,res)=>{
  const select_all_member = "SELECT * FROM members order by Firstname";
  connection.query(select_all_member,(err,results)=>{
    if (err){
     console.log (err);
    }
    console.log(results);
    let all_members = [];
    for(let i = 0; i < results.length; i++){
      // console.log(results[i].FirstName,
      //   results[i].LastName,
      //   results[i].DOB)
        all_members.push(results[i])
        console.log(all_members);
    }
    res.render("somedash",{data:all_members})
  })

});

module.exports = router;