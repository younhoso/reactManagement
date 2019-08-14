const fs = require('fs');
const express = require('express');
const path = require('path');
const os = require("os");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connetion = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.password,
  post: conf.post,
  database: conf.database
});
connetion.connect(); //연결한 데이터를 실행

app.get('/api/customers', (req, res)=>{
  connetion.query(
    "SELECT * FROM CUSTOMER2",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

app.listen(port, () => console.log(`porpt ${port}`));