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
	const result = await client.query(("Select estHarvest From field_info"));
	res.send(result.rows);
});

app.post('/query/getDate', async(req, res) => {
	var queryString = ("SELECT * FROM field_info WHERE estHarvest = \'" + req.body.date + "\'")
    const result = await client.query(queryString);
	res.send(result.rows);
});

app.post('/query/getInfo', async(req, res) => {
	var numCheckQuery = ("SELECT fieldNum FROM field_info WHERE EXISTS (SELECT fieldNum FROM field_info WHERE fieldNum = " + req.body.fieldNum + ")");
	const fieldNums = await client.query(numCheckQuery);

	if(!null){
		var queryString = ("SELECT * FROM field_info WHERE fieldNum = " + req.body.fieldNum)
		const result = await client.query(queryString);
		res.send(result.rows);
	}
});

app.post('/query/addField', async(req, res) => {
	try {
		if (req.body.fieldNum === null) { console.log("Not enough info provided"); return; }
		if (req.body.cropType === null) { console.log("Not enough info provided"); return; }
		if (req.body.datePlanted === null) { console.log("Not enough info provided"); return; }
		if (req.body.fieldOwner === null) { console.log("Not enough info provided"); return; }

		var numCheckQuery = ("SELECT fieldnum FROM field_info");
		const fieldNums = await client.query(numCheckQuery);
		
		let taken = false;
		for (i = 0; i < fieldNums.rows.length; i++) {
			if (fieldNums.rows[i].fieldnum === parseInt(req.body.fieldNum)) { taken = true; console.log("FIELD NUM TAKEN"); break; }
		}

		if (!taken) {
			var queryString1 = ("INSERT INTO field_info (fieldNum, cropType, datePlanted, fieldOwner) VALUES (" + parseInt(req.body.fieldNum) + ", \'" + req.body.cropType + "\', \'" + req.body.datePlanted + "\', \'" + req.body.fieldOwner + "\')");
			var queryString2 = ("UPDATE field_info SET irrcycle = (SELECT irrcycle FROM crop_info WHERE croptype = \'" + req.body.cropType + "\') where fieldnum = " + req.body.fieldNum);
			var queryString3 = ("UPDATE field_info SET estHarvest = ((SELECT datePlanted FROM field_info WHERE fieldNum = " + req.body.fieldNum + ") + (SELECT avgGrowthTime FROM crop_info WHERE cropType = \'" + req.body.cropType + "\')) WHERE fieldNum = " + req.body.fieldNum);
			
			await client.query(queryString1);
			await client.query(queryString2);
			await client.query(queryString3);

			console.log("FIELD ADDED");
		}
	} catch (err) {
		console.error(err);
	};
	res.redirect('/');		
});

app.post('/query/deleteEntry', async(req, res) => {
	var queryDel = ("DELETE FROM field_info WHERE fieldnum =" + req.body.fieldNum)
	await client.query(queryDel);
	res.redirect('/');
});

app.listen(port, ()=> {
  	console.log('Server Running');
  	console.log('http://localhost:3000/');
	client.connect().then( console.log('Connected To Database'));
});