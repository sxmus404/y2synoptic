class Calendar {
    constructor() {
        this.date = new Date();
        this.year = this.date.getFullYear();
        this.month = this.date.getMonth();
        this.months = [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];
    };
}

var cal = new Calendar();

const day = document.getElementById("calendar-days");
const dateCurr = document.getElementById("calendar-nav-curr");
const iconPrev = document.getElementById("calendar-nav-prev");
const iconNext = document.getElementById("calendar-nav-next");

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
            lit += `<li class="calendar-days-curr"> ${i} </li>`;
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

manipulateCalendar();