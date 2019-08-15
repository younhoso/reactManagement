const fs = require('fs');
const express = require('express');
const path = require('path');
const os = require("os");
var http = require('http'),
httpProxy = require('http-proxy');

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

const multer = require('multer');
const upload = multer({dest: './upload'})

app.get('/api/customers', (req, res)=>{
  connetion.query(
    "SELECT * FROM CUSTOMER2",
    (err, rows, fields) => {
      res.send(rows);
    }
  );

});

app.use('/image', express.static('./upload'));
app.post('/api/customers', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO CUSTOMER2 VALUES (null, ?, ?, ?, ?, ?)';
    let image = '/image/' + req.file.filename;
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job];
    connection.query(sql, params,(err, rows, fields) => {
      res.send(rows);
      console.log(err);
    });
});
httpProxy.createProxyServer({target:'http://localhost:5000'}).listen(5001);
app.listen(port, () => console.log(`porpt ${port}`));