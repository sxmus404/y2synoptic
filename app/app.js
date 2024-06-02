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

// Route to calendar page
app.get('/calendar', function(req, res) {
  res.sendFile('public/calendar.html', {root: __dirname}, (err) => {
      if (err) {console.log(err);}
  });
});

// // Route to crop page
// app.get('/crop', function(req, res) {
//   res.sendFile('public/crop.html', {root: __dirname}, (err) => {
//       if (err) {console.log(err);}
//   });
// });

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