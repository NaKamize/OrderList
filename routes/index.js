var express = require('express');
var router = express.Router();
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'mydb'
})

connection.connect(function (err) {
  if (err) throw err;
  console.log("DB connected!");
  /*connection.query("CREATE DATABASE mydb", function (err, result) {
    if (err) throw err;
    console.log("Database created");
  });
  var sql = "CREATE TABLE orders (id INT AUTO_INCREMENT PRIMARY KEY, list json DEFAULT NULL)";
  connection.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });*/
});

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/order', (req, res) => {
  let apples = req.body.apples;
  let bananas = req.body.bananas;
  let berries = req.body.berries;
  let oranges = req.body.oranges;
  let pears = req.body.pears;
  let straw = req.body.strawberries;

  if (apples === "") { apples = 0 }
  if (bananas === "") { bananas = 0 }
  if (berries === "") { berries = 0 }
  if (oranges === "") { oranges = 0 }
  if (pears === "") { pears = 0 }
  if (straw === "") { straw = 0 }


  let orderList = `Apples ${apples} Bananas ${bananas} Berries ${berries} Oranges ${oranges} Pears ${pears} Strawberries ${straw}`;
  let sql = `INSERT INTO orders (list) VALUES ("${orderList}")`;

  connection.query(sql, (err, res) => {
    if (err) throw err;
    console.log("Rows affected " + res.affectedRows);
  });

  res.redirect('/');
});

let data = []

router.get('/list', (req, res) => {
  connection.query("SELECT * FROM orders", (err, result) => {
    if (err) throw err;
    console.log(result);
    res.render('list', { title: 'All Orders', data: result });
  });
});

router.delete('/list/del/:id', (req, res) => {
  connection.query(`DELETE FROM orders WHERE id = ${req.params.id}`, (err, result) => {
    if (err) throw err;
    console.log(result);
  })

  res.redirect('/list');
});

module.exports = router;
