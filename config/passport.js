const LocalStrategy = require('passport-local').Strategy;

const mysql = require('mysql');;
const bcrypt  = require('bcryptjs');
const dbconfig = require('./database');
const connection = mysql.createConnection(dbconfig.connection);


connection.query('USE ' + dbconfig.database);

module.exports = function(passport){
  passport.serializeUser(function(user,done){
    done(null,user.id);
  });

  passport.deserializeUser(function(id,done){
    connection.query("SELECT * FROM  admin WHERE id = ?", [id],
    function(err,rows){
      done(err,rows[0]);
    });
  });
  passport.use(
    'local-signup',
     new LocalStrategy({
       usernameField : 'username',
       passwordField : 'password',
       passReqToCallback : true

     },
     function(req, username, password, done){
       connection.query("SELECT * FROM  admin WHERE username = ? ",
       [username], function(err, rows){
          if (err) 
         return done(err);
         if (rows.length) {
            return done(null, false, req.flash('signupMessaage', 'That is already taken'));           
         }else{
              const newUserMysql = {
                username: username,
                password: bcrypt.hashSync(password, null, null)
              };
              
              const insertQuery = "INSERT INTO admin (username,passsword) values (?, ?)";
              connection.query(insertQuery,[newUserMysql.username, newUserMysql.password],
                function(err,rows){
                  newUserMysql.id = rows.insertId;

                  return done(null,newUserMysql);
                });
                     }
    });
  })
  )
  passport.use(
    'local-login',
    new LocalStrategy({
      usernameField : 'username',
      passwordField : 'password',
      passReqToCallback : true
    },
    function(req,username,password,done){
      connection.query("SELECT * FROM  admin WHERE username = ? ",[username],
      function(err, rows){
      if (err) 
        return done(err);
        if (rows.length) {
          return done(null, false,req.flash('loginMessage','No User Found'));
        }
        if (bcrypt.compareSync(password,rows[0].password))
          return done(null, false, req.flash('loginMessage', 'Wrong Password'));
          return done (null,rows[0]);
        });
      })
    );
};

