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

};

function addCropInfo(cropType,avgGrowthTime,irrCycle){
    
    client.query("INSERT INTO crop_info (",cropType,", ",avgGrowthTime,", ",irrCycle,")VALUES (",cropType,", ",avgGrowthTime,", ",irrCycle,")", function(err,result){

        if(err) throw err;

});

}

function getDateInfo(date){

    client.query("Select estHarvest From field_info WHERE estHarvest = ",date,"", function(err,result){

        if(err) throw err;
        return result;
});

}

function getAllFieldInfo(){
    condition = false;
    array = [];
    for(x = 0;condition = false;x++){
    client.query("Select estHarvest From field_info WHERE fieldnum = ",x,"", function(err,result){

        if(err) throw err;
        if(result == NULL){
            condition == true;
        }
        else{
            array.push(result);
        }
        num++;
});
}
return array;

}