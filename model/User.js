const mysql = require('mysql');

const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'jahbless1',
    database : 'admin_pass'
  });

  const user  = mysql.model("User");

  module.exports =  user;