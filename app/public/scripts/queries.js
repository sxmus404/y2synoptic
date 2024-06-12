const { Client } = require('pg');
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

  

  client.query("SELECT * FROM crop_info", function (err, result){

    if (err) throw err;                                         //Generalised code on how to make a query

    console.log(result.rows[1].cropid);                         //important you do result.rows and not just result so that it doesnt print all table info

                                                                //to get specific value do "." and then whatever its called in the table(as shown)

  });






function createField(fieldNum,cropType,datePlanted,fieldOwner){

    client.query("INSERT INTO field_info (fieldNum, cropType, datePlanted, fieldOwner) VALUES (",fieldNum,", ",cropType,", ",datePlanted,", ",fieldOwner,")", function(err,result){

        if(err) throw err;

});

    client.query("INSERT INTO crop_info (irrCycle) VALUES ((SELECT irrCycle FROM crop_info WHERE cropType = ,",cropType,"))", function(err,result){

        if(err) throw err;

    });

    client.query("UPDATE field_info SET estHarvest = ((SELECT datePlanted FROM field_info WHERE fieldNum = ",fieldNum,") + (SELECT avgGrowthTime FROM crop_info WHERE cropType = ",cropType,")) WHERE fieldNum = ",fieldNum, function(err,result){

        if(err) throw err;

    });

const addCrop = {
    cropType: "",
    avgGrowthTime: "",
    irrCycle: ""

};

const addField = {
    fieldNum: "",
    cropType: "",
    datePlanted: "",
    fieldOwner: ""
};

// Add a new crop
fetch('/query/addCrop', {
    method: 'POST',
    body: JSON.stringify(addCrop)
}).then(response => response.json()).then(data => {
   // WHAT TO DO WITH THE DATA RETURNED HERE
}).catch(error => {
    console.error("Error: ", error)
});

// Add a new field
fetch('/query/addField', {
    method: 'POST',
    body: JSON.stringify(addField)
}).then(response => response.json()).then(data => {
   // WHAT TO DO WITH THE DATA RETURNED HERE
}).catch(error => {
    console.error("Error: ", error)
});

// Gets all the information on all crops
fetch('/query/getCrop', {
    method: 'POST'
}).then(response => response.json()).then(data => {
   // WHAT TO DO WITH THE DATA RETURNED HERE
}).catch(error => {
    console.error("Error: ", error)
});
}
return array;



// Gets all the information on all fields
fetch('/query/getFields', {
    method: 'POST'
}).then(response => response.json()).then(data => {
   // WHAT TO DO WITH THE DATA RETURNED HERE
}).catch(error => {
    console.error("Error: ", error)
});

function addFieldTemp(){
    e.preventDefault();
    const addField = {
        fieldNum: "21",
        cropType: "Potato",
        datePlanted: "2004/11/11",
        fieldOwner: "Zack"
    };

    fetch('/query/addField', {
        method: 'POST',
        body: JSON.stringify(addField)
    }).then(response => response.json()).then(data => {
       // WHAT TO DO WITH THE DATA RETURNED HERE
       console.log("cummy")
    }).catch(error => {
        console.error("Error: ", error)
    });
}

document.getElementById("field-form").addEventListener("submit", addFieldTemp())