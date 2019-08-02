const express = require('express');
const path = require('path');
const os = require("os");

const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public/')));

app.get('/api/customers', (req, res)=>{
    res.send([
          {
            'id' : 2,
            'image' : 'https://placeimg.com/64/64/1',
            'name': '길동이',
            'birthday': '961202',
            'gender': '남자',
            'job': '비회원'
          },
          {
            'id' : 3,
            'image' : 'https://placeimg.com/64/64/2',
            'name': '홍길동',
            'birthday': '960305',
            'gender': '여자',
            'job': '회원' 
          },
    ])
});

app.listen(port, () => console.log(`porpt ${port}`));