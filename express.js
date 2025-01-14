const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({methods:['POST','GET']}));
app.use(express.json());
app.use(express.static('public'));


const listener = app.listen('3000', () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});



const request = require('request');
request.get({
  url: 'https://toster.ru/q/461924',
  proxy: 'http://195.209.176.2:8080'
}, (err, res) => {
  if (err) {
    console.log('ERROR', err);
  } else {
    console.log('OK', res);
  }
});




