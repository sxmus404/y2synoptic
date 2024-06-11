const express = require("express");
const path = require("path");
const { Client } = require("pg");
const googleTranslate = require('@vitalets/google-translate-api');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));

// Create a client for connecting to the database
const client = new Client({
	user: 'postgres',
	host: '81.99.224.111',
	database: 'postgres',
	password: 'securepassword',
	port: 5432
});

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

// Route to farming page
app.get('/farming', function(req, res) {
	res.sendFile('public/farming.html', {root: __dirname}, (err) => {
		if (err) {console.log(err);}
   });
});

// Route to about page
app.get('/about', function(req, res) {
  	res.sendFile('public/about.html', {root: __dirname}, (err) => {
      	if (err) {console.log(err);}
  	});
});

app.post('/translate', async(req, res) => {
	const {text, language} = req.body;
	try {
		const result = await googleTranslate.translate(text, {to: language});
		res.json({translation: result.text});
	} catch (error) {
		console.error("Translation error: ", error.message);
		res.status(500).json({error: error.message});
	}
});

app.post('/query', async(req, res) => {
	pgConnect().then(data => {
		res.send(data);
	});
});

app.listen(port, ()=> {
  	console.log('Server Running');
  	console.log('http://localhost:3000/');
});

async function pgConnect() {
	await client.connect();
	try { return await client.query('SELECT * FROM crop_info');
	} catch (err) { console.error(err);
	} finally { await client.end() }
}

// function getCrops() { 
// 	return new Promise((resolve, reject) => {
// 		client.query("SELECT * FROM crop_info");
// 	});
// };