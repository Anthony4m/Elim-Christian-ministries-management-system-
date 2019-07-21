// connect to elim_christian_centre in node
// ps: run npm init and run npm mysql before you connect to database
// dependencies imported are express,mysql,body-parser,ejs
const express = require('express');
const app = express();
const mysql = require('mysql');
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const cookieParser =  require('cookie-parser');
const morgan = require('morgan');
const   flash = require('connect-flash');
const session = require('express-session');
const passport = require("passport");

//passport onfigg
require('./config/passport')(passport);
// require('./app/routes')(app,passport)

app.use(morgan('dev'));
app.use(cookieParser());
 

// use imported dependencies
app.use(express.static(__dirname + "/public"));
// set ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
// use body-parser
app.use(bodyParser.urlencoded({extended:true}));
// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});
// set database connection
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'jahbless1',
  database : 'ELIM_CHRISTIAN_CENTRE'
});

//Routes
// home
app.use('/',require('./routes/index'));
// registrations
app.use('/users',require('./routes/users'));
// dashboard home 
app.use('/main',require('./routes/main'));

try {
  // insert member into database
app.post("/insert",(req,res)=>{
  const insert = "INSERT INTO members SET ?";
  const member = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    phone: req.body.Phone,
    dob: req.body.DOB
  };

  connection.query(insert,member,(err,results)=>{
    if(err){
      console.log(err)
      res.render("error",{err:err});
    }
    else{
    console.log(results);
    res.redirect("/main/dash");
    }
  })
});


//   DISPLAY ALL USERS 
app.get("/members",(req,res)=>{
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

//   SEARCH FORMS
app.get("/search_form",(req,res)=>{
  res.render("search_form")
});

// SEARCH RESULTS
app.post("/searched",(req,res)=>{
  const search = `SELECT FirstName,LastName,Phone,DOB FROM members where FirstName = '${req.body.firstname}'`;
  connection.query(search,(err,results)=>{
    if(err){
      console.log(err)
    }
    console.log(results)
    console.log(req.body.firstname)
    let members = [];
    for(let i = 0; i < results.length; i++){
      members.push(results[i])
      console.log(members)
    }
    res.render("search_page",{data:members})
    
  })
});
} catch (error) {
  res.render("error",{err:err});
  console.log(error)
  res.send(`<h1>${error}<\h1>`)
}


// The recommended way to establish a connection is this:
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  } 

  console.log('connected as id ' + connection.threadId);
});



//use http://localhost:3000 to access this site
const PORT = process.env.PORT || 3001
app.listen(PORT,()=>{
  console.log(`app is listening on port ${PORT} `)
});
