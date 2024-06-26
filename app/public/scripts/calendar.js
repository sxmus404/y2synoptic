class Calendar {
    constructor() {
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    };
}

var cal = new Calendar();

const day = document.getElementById("calendar-days");
const dateCurr = document.getElementById("calendar-nav-curr");
const iconPrev = document.getElementById("calendar-nav-prev");
const iconNext = document.getElementById("calendar-nav-next");
const dayInfo = document.getElementById("calendar-day-info");

var harvests = [];

fetch('/query/getHarvestDays')
.then(response => {
    if (!response.ok) { return response.text().then(text => { throw new Error(text) }); }
    return response.json();
})
.then(data => {
    // Add all non-null dates to the array and remove redundant data
    for (let i = 0; i  < data.length; i++) {
        if (data[i].estharvest != null) { harvests.push(data[i].estharvest.split('T')[0]); }
    }
    manipulateCalendar();
}).catch(err => { console.error("Error: ", err) });

function manipulateCalendar() {
    let firstDay = new Date(cal.year, cal.month, 1).getDay();
    let lastDate = new Date(cal.year, cal.month + 1, 0).getDate();
    let lastDay = new Date(cal.year, cal.month, lastDate).getDay();
    let lastDayPrev = new Date(cal.year, cal.month, 0).getDate();

    let lit="";

    for (let i = firstDay - 1; i > 0; i--) {
        lit += `<li class="calendar-days-unfocus"> ${(lastDayPrev - i) + 1} </li>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        if (i === cal.date.getDate() && cal.month === new Date().getMonth() && cal.year === new Date().getFullYear()) {
            lit += `<li><span class="calendar-days-active"> ${i} </span></li>`;
        } else {
            let found = false;
            let checkDate = new Date(cal.year, cal.month, i);
            for (let j = 0; j < harvests.length; j++) {
                if (harvests[j] === checkDate.toISOString().split('T')[0]) {
                        found = true; 
                        break;
                }
            }

            if (!found) { lit += `<li class="calendar-days-curr"> ${i} </li>`; } 
            else { lit += `<li class="calendar-days-harvest"> ${i} </li>`; }
        };
    }

    for (let i = lastDay; i <= 6; i++) {
        lit += `<li class="calendar-days-unfocus"> ${i - lastDay + 1} </li>`
    }
    
    dateCurr.innerText = `${cal.months[cal.month]} ${cal.year}`;
    day.innerHTML = lit;
};

iconPrev.addEventListener("click", ()=> {
    cal.month -= 1;

    if (cal.month < 0) {
        cal.date = new Date(cal.year, cal.month, new Date().getDate());
        cal.year = cal.date.getFullYear();
        cal.month = cal.date.getMonth();
    } else {
        cal.date = new Date();
    }

    manipulateCalendar();
});

iconNext.addEventListener("click", ()=> {
    cal.month += 1;

    if (cal.month > 11) {
        cal.date = new Date(cal.year, cal.month, new Date().getDate());
        cal.year = cal.date.getFullYear();
        cal.month = cal.date.getMonth();
    } else {
        cal.date = new Date();
    }
    
    manipulateCalendar();
});

day.addEventListener("click", function(e) {
    if (e.target) {
        let tempDate = new Date(cal.year, cal.month, parseInt(e.target.innerText) + 1);

        e.preventDefault();
        fetch('/query/getDate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({date: tempDate.toISOString().split('T')[0]})
        }).then(response => response.json()).then(data => {
            if (data) {
                let lit="";
                if (data.length === 0) {
                    lit += `<p class="translate"> No crops need to be harvested this day </p>`;
                } else {
                    for (let i = 0; i < data.length; i++) {
                        lit += `<p class="translate"> ${data[i].fieldowner} | Field: ${data[i].fieldnum} | Crop: ${data[i].croptype} </p>`;
                    }
                }
                dayInfo.innerHTML = lit;
            }
        }).catch(err => {
            console.error("Error: ", err)
        });
    }
});