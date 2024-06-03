const express = require("express");
const path = require("path");
const { Client } = require('pg');
const app = express();
const path = require ("path");
const port = 3000;
app.use(express.static(path.join(__dirname + '/public')));

// Default route to home page
app.get('/', function(req, res) {
  res.sendFile('public/home.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

// Route to calendar page
app.get('/calendar', function(req, res) {
  res.sendFile('public/calendar.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.get('/test', function(req, res) {
  res.sendFile('public/geoLocationTesting/test.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});


// Route to about page
app.get('/about', function(req, res) {
  res.sendFile('public/about.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.listen(port, ()=> {
  console.log('Server Running');
  console.log('http://localhost:3000/');
});

const client = new Client({
  user: 'postgres',
  host: '81.99.224.111',
  database: 'postgres', //Connect to Sam's server
  password: 'zackisgay',
  port: 5432,
})

client.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

// client.query("SELECT * FROM crop_info", function (err, result){
//   if (err) throw err;                                         //Generalised code on how to make a query
//   console.log(result.rows[1].cropid);                         //important you do result.rows and not just result so that it doesnt print all table info
//                                                               //to get specific value do "." and then whatever its called in the table(as shown)
// });