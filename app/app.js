const express = require("express");
const app = express();
const port = 3000;

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

app.listen(port, ()=> {
  console.log('Server Running');
  console.log('http://localhost:3000/');
});