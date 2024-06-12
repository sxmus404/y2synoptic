// const addCrop = {
//     cropType: "",
//     avgGrowthTime: "",
//     irrCycle: ""
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
    var formFieldNum = document.getElementById("field-number");
    var formCropType = document.getElementById("crop-type");
    var formDatePlanted = document.getElementById("date-planted");
    var formFieldOwner = document.getElementById("field-owner");

    e.preventDefault();
    const addField = {
        fieldNum: formFieldNum.value,
        cropType: formCropType.value,
        datePlanted: formDatePlanted.value,
        fieldOwner: formFieldOwner.value
    };
    
    fetch('/query/addField', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(addField)
    }).then(response => response.json());
});
