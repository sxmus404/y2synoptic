const express = require("express");
const app = express();
const path = require ("path");
const port = 3000;
app.use(express.static(path.join(__dirname + '/public')));

const favicon = require("serve-favicon");
app.use(favicon(__dirname + '/public/images/favicon.ico'));

// Default route to home page
app.get('/', function(req, res) {
  res.sendFile('public/home.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.get('/cheese', function(req, res) {
  res.sendFile('public/page2.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.get('/test', function(req, res) {
  res.sendFile('public/geoLocationTesting/test.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

// TESTING ONLY - REMOVE 
app.get('/ico', function(req, res) {
  res.sendFile('public/images/favicon.ico', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.listen(port, ()=> {
  console.log('Server Running');
  console.log('http://localhost:3000/');
});