interface IToday{
    year:number,
    month:number,
    day:number,
}
interface IGetMonthInformation{
    name:string,
    fristDay:number,
    days:number
}

interface IDataOfCalender{
    year:number,
    month:number,
    today:IToday
}

const today:IToday={
    year:1405,
    month:4,
    day:29
}

const monthName=[
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
]


const fristDayOfMonth=[
    3,
    0,
    1,
    4,
    0,
    1,
    3,
    5,
    1,
    2,
    4,
    0
]


const dayInMonth=(month:number):number=>(
month<=6?31:month<=11?30:29
)
 
const getMonthInformation=(month:number):IGetMonthInformation=>({
    name:monthName[month-1]!,
    fristDay:fristDayOfMonth[month-1]!,
    days:dayInMonth(month)
}
)

// built calender
const renderCalender=(data:IDataOfCalender):void=>{
const calender=document.getElementById("calender") as HTMLDivElement;
const button=document.getElementById("button") as HTMLDivElement;
calender.innerHTML=""
button.innerHTML=""

const monthInformation=getMonthInformation(data.month)

const titleEl=document.getElementById("title") as HTMLHeadElement
titleEl.textContent=`${monthInformation.name} ${data.year}`
titleEl.style.color="#ffffff"


//prev button
const prevButton=document.createElement("button")
prevButton.textContent="<"
prevButton.onclick=()=>{
const newMonth=data.month===1?12:data.month-1
 const newYear=data.month===1?data.year-1:data.year
  renderCalender({year:newYear,month:newMonth,today})
}

//next button 
const nextButton=document.createElement("button")
nextButton.textContent=">"
nextButton.onclick=()=>{
const newMonth=data.month===12?1:data.month+1
const newYear=data.month===12?data.year+1:data.year
  renderCalender({year:newYear,month:newMonth,today})
}
button.appendChild(prevButton)
button.appendChild(nextButton)

const grid=document.createElement("div")
grid.classList.add("grid")

const weekDays = [
  "شنبه",
  "یکشنبه",
  "دوشنبه",
  "سه‌شنبه",
  "چهارشنبه",
  "پنجشنبه",
  "جمعه",
];
weekDays.forEach((day)=>{
    const cell=document.createElement("div")
    cell.textContent=day
    grid.appendChild(cell)
})


//empty cell before the first day
for(let i=0;i<monthInformation.fristDay;i++){
    const emptyCell=document.createElement("div")
    emptyCell.style.background="#f3f4f6"
    grid.appendChild(emptyCell)
}

//Days of the month
for(let day=1;day<=monthInformation.days;day++){
    const cell= document.createElement("div")
    cell.textContent=day.toString()
    if(data.year===today.year&&data.month===today.month&&day===today.day){
        cell.style.background="#d0f0ff"
    }
    grid.appendChild(cell)
}
//empty cell after the last day
const totalCells=monthInformation.fristDay+monthInformation.days
const remainingCells=35-totalCells
for(let i=0;i<remainingCells;i++){
    const emptyCell=document.createElement("div")
    emptyCell.style.background="#f3f4f6"
    grid.appendChild(emptyCell)
}

calender.appendChild(grid)
}
renderCalender({year:today.year,month:today.month,today})


