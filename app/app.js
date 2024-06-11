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

// Function for connection and query of the database
async function pgConnect(queryString) {
	await client.connect();
	try { return await client.query(queryString); } 
	catch (err) { console.error(err); } 
	finally { await client.end(); }
};

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

app.post('/query/addCrop', async(req, res) => {
    pgConnect("INSERT INTO crop_info (" + req.body.cropType + ", " + req.body.avgGrowthTime + ", " + req.body.irrCycle + ") VALUES (" + req.body.cropType + ", " + req.body.avgGrowthTime + ", " + req.body.irrCycle + ")").then(data => {
		if (err) { throw err; }
	});
});

app.post('/query/getCrop', async(req, res) => {
    pgConnect("SELECT * FROM crop_info").then(data => {
		if (err) { throw err; }
		res.send(data);
	});
});

app.post('/query/getField', async(req, res) => {
    condition = false;
    array = [];

    for (i = 0; !condition; i++) {
        pgConnect("Select estHarvest From field_info WHERE fieldnum = " + i).then(data => {
			if (err) { throw err; }
			if (data == NULL) { condition == true; }
			else { array.push(data); }
		});
        num++;
    };

	res.send(array);
});

app.post('/query/getDate', async(req, res) => {
    pgConnect("Select estHarvest From field_info WHERE estHarvest = " + req.body.date).then(data => {
		if (err) { throw err; } 
		res.send(data);
	});
});

app.post('/query/addField', async(req, res) => {
    pgConnect("INSERT INTO field_info (fieldNum, cropType, datePlanted, fieldOwner) VALUES (" + req.body.fieldNum + ", " + req.body.cropType + ", " + req.body.datePlanted, ", " + req.body.fieldOwner + ")").then(data => {
		if (err) { throw err; }
	})

   	pgConnect("INSERT INTO crop_info (irrCycle) VALUES (SELECT irrCycle FROM crop_info WHERE cropType = " + req.body.cropType + ")").then(data => {
		if (err) { throw err; }
	});

    pgConnect("UPDATE field_info SET estHarvest = ((SELECT datePlanted FROM field_info WHERE fieldNum = " + req.body.fieldNum + ") + (SELECT avgGrowthTime FROM crop_info WHERE cropType = " + req.body.cropType + ")) WHERE fieldNum = " + req.body.fieldNum).then(data => {
		if (err) { throw err; }
	});
});

app.listen(port, ()=> {
  	console.log('Server Running');
  	console.log('http://localhost:3000/');
});