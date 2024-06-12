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

fieldForm.addEventListener("click", function(e) {
    // Access all the form content here

    e.preventDefault();
    const addField = {
        fieldNum: "",
        cropType: "",
        datePlanted: "",
        fieldOwner: ""
    };

    fetch('/query/addField', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addField)
    }).then(response => response.json()).then(data => {
       // WHAT TO DO WITH THE DATA RETURNED HERE

       console.log("cummy")
    });
});