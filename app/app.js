const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { Client, Pool } = require("pg");
const googleTranslate = require('@vitalets/google-translate-api');

const app = express();
const port = 3000;

app.use(express.json());
app.use(express.static(path.join(__dirname + '/public')));
app.use(bodyParser.urlencoded({ extended: false }));

// Create a client for connecting to the database
const client = new Client({
	user: 'postgres',
	host: '81.99.224.111',
	database: 'postgres',
	password: 'zackisgay',
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

app.post('/query/addCrop', async(req, res) => {
    await client.query("INSERT INTO crop_info (" + req.body.cropType + ", " + req.body.avgGrowthTime + ", " + req.body.irrCycle + ") VALUES (" + req.body.cropType + ", " + req.body.avgGrowthTime + ", " + req.body.irrCycle + ")");
});

app.post('/query/getCrop', async(req, res) => {
    await client.query("SELECT * FROM crop_info").then(data => {
		res.send(data);
	});
});

app.get('/query/getHarvestDays', async(req, res) => {
	try {
		condition = false;
		harvestDays = [];
	
		for (i = 0; !condition; i++) {
			const result = await client.query(("Select estHarvest From field_info WHERE fieldnum = ", i, ""));
			if (result.rows.length = 0) { 
				condition == true; 
			} else { 
				harvestDays.push(result.rows[0]); 
			}
		};
	
		console.log(harvestDays);
		res.json(harvestDays);
	} catch (err) {
		console.error('Database error:', err);
		res.status(500).json({ error: 'Internal Server Error' });
	} finally {
		client.release();
	}
});

app.post('/query/getDate', async(req, res) => {
	var queryString = ("SELECT * FROM field_info WHERE estHarvest = \'" + req.body.date + "\'")
    const result = await client.query(queryString);
	res.send(result.rows);
});

app.post('/query/addField', async(req, res) => {
    await client.query(("INSERT INTO field_info (fieldNum, cropType, datePlanted, fieldOwner) VALUES (", req.body.fieldNum, ", ", req.body.cropType,", ", req.body.datePlanted, ", ", req.body.fieldOwner, ")"));
   	await client.query(("INSERT INTO crop_info (irrCycle) VALUES (SELECT irrCycle FROM crop_info WHERE cropType = ", req.body.cropType, ")"));
    await client.query(("UPDATE field_info SET estHarvest = ((SELECT datePlanted FROM field_info WHERE fieldNum = ", req.body.fieldNum, ") + (SELECT avgGrowthTime FROM crop_info WHERE cropType = ", req.body.cropType, ")) WHERE fieldNum = ", req.body.fieldNum));
});

app.listen(port, ()=> {
  	console.log('Server Running');
  	console.log('http://localhost:3000/');
	client.connect().then( console.log('Connected To Database'));
});