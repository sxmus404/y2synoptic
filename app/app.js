const express = require("express");
const path = require("path");

const app = express();
const port = 3000;

console.log("DIRNAME: " + __dirname);
app.use(express.static(path.join(__dirname + '/public')));

// Default route to home page
app.get('/', function(req, res) {
  res.sendFile('public/home.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

// Route to second page [NEEDS TO BE RENAMED]
app.get('/cheese', function(req, res) {
  res.sendFile('public/page2.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

app.listen(port, ()=> {
  console.log('Server Running');
  console.log('http://localhost:3000/');
});