// const addCrop = {
//     cropType: "",
//     avgGrowthTime: "",
//     irrCycle: ""

// };

// const addField = {
//     fieldNum: "",
//     cropType: "",
//     datePlanted: "",
//     fieldOwner: ""
// };

// // Add a new crop
// fetch('/query/addCrop', {
//     method: 'POST',
//     body: JSON.stringify(addCrop)
// }).then(response => response.json()).then(data => {
//    // WHAT TO DO WITH THE DATA RETURNED HERE
// }).catch(error => {
//     console.error("Error: ", error)
// });

// // Add a new field
// fetch('/query/addField', {
//     method: 'POST',
//     body: JSON.stringify(addField)
// }).then(response => response.json()).then(data => {
//    // WHAT TO DO WITH THE DATA RETURNED HERE
// }).catch(error => {
//     console.error("Error: ", error)
// });

// // Gets all the information on all crops
// fetch('/query/getCrop', {
//     method: 'POST'
// }).then(response => response.json()).then(data => {
//    // WHAT TO DO WITH THE DATA RETURNED HERE
// }).catch(error => {
//     console.error("Error: ", error)
// });



// // Gets all the information on all fields
// fetch('/query/getFields', {
//     method: 'POST'
// }).then(response => response.json()).then(data => {
//    // WHAT TO DO WITH THE DATA RETURNED HERE
// }).catch(error => {
//     console.error("Error: ", error)
// });

var fieldForm = document.getElementById("field-form");

fieldForm.addEventListener("click", function() {
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
});