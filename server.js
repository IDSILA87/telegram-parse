const express = require('express');
const cors = require('cors');
const fs = require('fs');
const axios = require('axios');
const cheerio = require("cheerio");

const app = express();

app.use(cors({ methods: ['POST', 'GET'] }));
app.use(express.json());

let size = 0;
const url = 'https://telegram-parse.glitch.me';
const symbols = '0123456789QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm-_';
const maska = 'XXXXXXXXXXXXXXXX'.split('');
const generateChannel = () => {
  return maska.reduce((acc) => acc + symbols.split('')[Math.ceil(Math.random() * symbols.length) - 1], '')
}



const startApp = () => {
  const hash = generateChannel();
  size += 1;
  axios(`https://t.me/+${hash}`).then(res => {
    const html = cheerio.load(res.data);
    const name = html('span[dir="auto"]')[0];
    if (name != undefined) {
      axios(`${url}/add?hash=${hash}`).then(res_2 => {
        startApp();
      })
    }
    else {
      startApp();
    }
  })
}

//startApp();


app.get('/sleep', (req, res) => {
  res.send({ type: true });
});

app.post('/sleep', (req, res) => {
  res.send({ type: true });
});


setInterval(() => {
  //axios(`${url}/update?size=${size}`).then(res_2 => {
    //size = 0;
  //})
}, 3 * 60000);

const listener = app.listen('3000', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});

