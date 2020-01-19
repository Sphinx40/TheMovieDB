const mysql = require('mysql2');
const connection = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    database: "movies",
    password: "essqueell"
  });
   connection.connect(function(err){
      if (err) {
        return console.error("Ошибка из Mysql: " + err.message);
      }
      else{
        console.log("Подключение к серверу MySQL успешно установлено");
      }
   });
   
module.exports = connection;